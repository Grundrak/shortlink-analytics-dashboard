const shortid = require("shortid");
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const logger = require("../utils/logger");
const { AppError } = require("../middleware/errorHandler");
const { visitorInfos } = require("../utils/visitorInfo");

class UrlController {
  async createShortLink(req, res, next) {
    try {
      const { originalUrl, customAlias } = req.body;

      // Validate presence of originalUrl
      if (!originalUrl) {
        throw new AppError("Please provide a URL", 400);
      }

      // Validate URL format
      try {
        new URL(originalUrl);
      } catch (err) {
        throw new AppError("Invalid URL format", 400);
      }

      // Sanitize and normalize customAlias
      const sanitizedCustomAlias =
        typeof customAlias === "string" && customAlias.trim() !== ""
          ? customAlias.trim().toLowerCase()
          : undefined;

      // Use a transaction to ensure consistency
      const url = await prisma.$transaction(async (tx) => {
        // Check for existing customAlias
        if (sanitizedCustomAlias) {
          const existing = await tx.url.findFirst({
            where: { customAlias: sanitizedCustomAlias },
          });

          if (existing) {
            throw new AppError("Custom alias already in use", 409);
          }
        }

        // Generate unique shortCode
        let shortCode;
        let attempts = 0;
        const maxAttempts = 5;

        do {
          shortCode = shortid.generate();
          const existingCode = await tx.url.findFirst({
            where: { shortCode },
          });

          if (!existingCode) break;
          attempts++;

          if (attempts >= maxAttempts) {
            throw new AppError("Unable to generate unique short code", 500);
          }
        } while (true);

        // Create the URL
        return await tx.url.create({
          data: {
            originalUrl,
            shortCode,
            customAlias: sanitizedCustomAlias,
            owner: {
              connect: { id: req.user.id },
            },
            clicks: 0,
          },
        });
      });

      logger.info(`New short URL created: ${url.shortCode} for ${originalUrl}`);

      return res.status(201).json({
        success: true,
        data: {
          shortCode: url.shortCode,
          originalUrl: url.originalUrl,
          shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
          customAlias: url.customAlias,
        },
      });
    } catch (error) {
      logger.error(`Error creating short link: ${error.message}`, { error });

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return next(new AppError("Custom alias already in use", 409));
        }
      }

      next(error);
    }
  }
  async getUrl(req, res, next) {
    try {
      const { shortCode } = req.params;
      logger.info(`Fetching URL for shortCode: ${shortCode}`);

      const url = await prisma.url.findFirst({
        where: {
          OR: [{ shortCode }, { customAlias: shortCode }],
        },
      });

      if (!url) {
        throw new AppError("URL not found", 404);
      }

      // Increment click count and log analytics if necessary
      await prisma.url.update({
        where: { id: url.id },
        data: { clicks: { increment: 1 } },
      });

      res.redirect(url.originalUrl);
    } catch (error) {
      next(error);
    }
  }

  async getAllUrls(req, res, next) {
    try {
      const ownerId = req.user._id;

      const urls = await prisma.url.findMany({
        where: { ownerId },
      });

      res.status(200).json({
        success: true,
        data: urls,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete a URL by shortCode or customAlias
  async deleteUrl(req, res, next) {
    try {
      const { shortCode } = req.params;
      const userId = req.user._id;
      const userRole = req.user.role;

      const url = await prisma.url.findFirst({
        where: {
          OR: [{ shortCode }, { customAlias: shortCode }],
        },
        include: { owner: true },
      });

      if (!url) {
        throw new AppError("URL not found", 404);
      }

      // Check if the requester is the owner or an admin
      if (url.ownerId !== userId && userRole !== "ADMIN") {
        throw new AppError("Forbidden: You cannot delete this URL", 403);
      }

      await prisma.url.delete({
        where: { id: url.id },
      });

      res.status(204).end();
    } catch (error) {
      console.error(`Error deleting URL: ${error.message}`);
      next(error);
    }
  }
}

const redirectShortUrl = async (req, res, next) => {
  const { shortCode } = req.params;
  try {
    const url = await prisma.url.findUnique({ where: { shortCode } });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    const visitorInfo = visitorInfos(req);
    console.log('Collected Visitor Info:', visitorInfo);

    // Create analytics entry
    await prisma.analytics.create({
      data: {
        url: {
          connect: { id: url.id },
        },
        ipAddress: visitorInfo.ipAddress,
        device: visitorInfo.device,
        browser: visitorInfo.browser,
        operatingSystem: visitorInfo.operatingSystem,
        referrer: visitorInfo.referrer,
        location: visitorInfo.location,
      },
    });

    // Update click count
    await prisma.url.update({
      where: { id: url.id },
      data: { clicks: { increment: 1 } },
    });

    // Redirect user
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Error in redirectShortUrl:', error);
    next(error);
  }
};
module.exports = {
  createShortLink: new UrlController().createShortLink,
  getUrl: new UrlController().getUrl,
  getAllUrls: new UrlController().getAllUrls,
  deleteUrl: new UrlController().deleteUrl,
  redirectShortUrl,
};

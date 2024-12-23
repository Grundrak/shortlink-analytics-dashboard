const shortid = require("shortid");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const logger = require("../utils/logger");
const { AppError } = require("../middleware/errorHandler");

class UrlController {
  async createShortLink(req, res, next) {
    try {
      const { originalUrl, customAlias } = req.body;

      if (!originalUrl) {
        throw new AppError('Please provide a URL', 400);
      }

      // Validate URL format
      try {
        new URL(originalUrl);
      } catch (err) {
        throw new AppError('Invalid URL format', 400);
      }

      let shortCode;

      if (customAlias) {
        shortCode = customAlias;

        // Check if customAlias already exists
        const existingCustomAlias = await prisma.url.findUnique({
          where: { customAlias },
        });

        if (existingCustomAlias) {
          throw new AppError('This custom alias already exists. Please choose another one.', 409);
        }
      } else {
        // Generate a unique shortCode
        shortCode = shortid.generate();

        // Ensure the generated shortCode is unique
        let existingShortCode = await prisma.url.findUnique({
          where: { shortCode },
        });

        while (existingShortCode) {
          shortCode = shortid.generate();
          existingShortCode = await prisma.url.findUnique({
            where: { shortCode },
          });
        }
      }

      // Prepare the data object conditionally
      const data = {
        originalUrl,
        shortCode,
        owner: {
          connect: { id: req.user.id }
        },
        clicks: 0,
      };

      // Only set customAlias if provided
      if (customAlias) {
        data.customAlias = customAlias;
      }

      // Create short URL
      const url = await prisma.url.create({
        data,
      });

      logger.info(`New short URL created: ${shortCode} for ${originalUrl}`);

      return res.status(201).json({
        success: true,
        data: {
          shortCode: url.shortCode,
          originalUrl: url.originalUrl,
          shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getUrl(req, res, next) {
    try {
      const { shortCode } = req.params;

      const url = await prisma.url.findFirst({
        where: {
          OR: [{ shortCode }, { customAlias: shortCode }],
        },
      });

      if (!url) {
        throw new AppError("URL not found", 404);
      }

      // Increment click count
      await prisma.url.update({
        where: { id: url.id },
        data: { clicks: { increment: 1 } },
      });

      res.redirect(url.originalUrl);
    } catch (error) {
      next(error);
    }
  }
}

const redirectShortUrl = async (req, res, next) => {
  const { shortCode } = req.params;
  try {
    const url = await prisma.url.findUnique({ where: { shortCode } });
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }
    // Optionally capture analytics here or via middleware
    res.redirect(url.originalUrl);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShortLink: new UrlController().createShortLink,
  getUrl: new UrlController().getUrl,
  redirectShortUrl,
};
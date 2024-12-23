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

      const shortCode = customAlias || shortid.generate();

      // Check for existing shortCode
      const existingUrl = await prisma.url.findFirst({
        where: {
          OR: [{ shortCode }, { customAlias: shortCode }],
        },
      });

      if (existingUrl) {
        throw new AppError('This short code already exists for another URL', 409);
      }

      // Create short URL
      const url = await prisma.url.create({
        data: {
          originalUrl,
          shortCode,
          customAlias,
          userId: req.user.id, // Assuming user ID is stored in req.user
          clicks: 0,
          owner: {
            connect: { id: req.user.id } // Connect the URL to the user
          }
        },
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
        data: { click: { increment: 1 } },
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

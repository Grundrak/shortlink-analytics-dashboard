const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { AppError } = require('../middleware/errorHandler');

class AnalyticsController {
  // Get analytics for a specific URL
  async getUrlAnalytics(req, res, next) {
    try {
      const { urlId } = req.params;
      const userId = req.user.id;

      const url = await prisma.url.findUnique({
        where: { id: urlId },
        include: {
          analytics: {
            orderBy: { clickedAt: 'desc' }
          }
        }
      });

      if (!url) {
        throw new AppError('URL not found', 404);
      }

      if (url.ownerId !== userId && req.user.role !== 'ADMIN') {
        throw new AppError('Forbidden: Access denied', 403);
      }

      const summary = this.calculateAnalyticsSummary(url.analytics);

      res.status(200).json({
        success: true,
        data: {
          urlInfo: {
            originalUrl: url.originalUrl,
            shortCode: url.shortCode,
            customAlias: url.customAlias,
            createdAt: url.createdAt
          },
          summary,
          details: url.analytics
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get analytics for a specific time range
  async getAnalyticsByTimeRange(req, res, next) {
    try {
      const { urlId } = req.params;
      const { startDate, endDate } = req.query;
      const userId = req.user.id;

      const url = await prisma.url.findUnique({
        where: { id: urlId },
        include: {
          analytics: {
            where: {
              clickedAt: {
                gte: new Date(startDate),
                lte: new Date(endDate)
              }
            },
            orderBy: { clickedAt: 'desc' }
          }
        }
      });

      if (!url) {
        throw new AppError('URL not found', 404);
      }

      if (url.ownerId !== userId && req.user.role !== 'ADMIN') {
        throw new AppError('Forbidden: Access denied', 403);
      }

      const summary = this.calculateAnalyticsSummary(url.analytics);

      res.status(200).json({
        success: true,
        data: {
          timeRange: { startDate, endDate },
          summary,
          details: url.analytics
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get analytics summary for all URLs owned by user
  async getUserAnalyticsSummary(req, res, next) {
    try {
      const userId = req.user.id;

      const urls = await prisma.url.findMany({
        where: { ownerId: userId },
        include: {
          analytics: true
        }
      });

      const summary = urls.map(url => ({
        urlId: url.id,
        shortCode: url.shortCode,
        customAlias: url.customAlias,
        analytics: this.calculateAnalyticsSummary(url.analytics)
      }));

      res.status(200).json({
        success: true,
        data: summary
      });
    } catch (error) {
      next(error);
    }
  }

  // Get real-time analytics (last 5 minutes)
  async getRealTimeAnalytics(req, res, next) {
    try {
      const { urlId } = req.params;
      const userId = req.user.id;
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

      const realtimeClicks = await prisma.analytics.findMany({
        where: {
          urlId,
          clickedAt: {
            gte: fiveMinutesAgo
          }
        },
        orderBy: {
          clickedAt: 'desc'
        }
      });

      res.status(200).json({
        success: true,
        data: {
          realtimeClicks,
          count: realtimeClicks.length
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get top performing URLs
  async getTopPerformingUrls(req, res, next) {
    try {
      const userId = req.user.id;
      const { limit = 10 } = req.query;

      const urls = await prisma.url.findMany({
        where: { ownerId: userId },
        orderBy: { clicks: 'desc' },
        take: parseInt(limit),
        include: {
          analytics: {
            orderBy: { clickedAt: 'desc' },
            take: 1
          }
        }
      });

      res.status(200).json({
        success: true,
        data: urls
      });
    } catch (error) {
      next(error);
    }
  }

  // Export analytics data
  async exportAnalytics(req, res, next) {
    try {
      const { urlId } = req.params;
      const { format = 'json' } = req.query;
      const userId = req.user.id;

      const url = await prisma.url.findUnique({
        where: { id: urlId },
        include: {
          analytics: true
        }
      });

      if (!url) {
        throw new AppError('URL not found', 404);
      }

      if (url.ownerId !== userId && req.user.role !== 'ADMIN') {
        throw new AppError('Forbidden: Access denied', 403);
      }

      const data = {
        urlInfo: {
          originalUrl: url.originalUrl,
          shortCode: url.shortCode,
          customAlias: url.customAlias,
          createdAt: url.createdAt
        },
        analytics: url.analytics
      };

      if (format === 'csv') {
        // Convert to CSV format
        const csv = this.convertToCSV(data);
        res.header('Content-Type', 'text/csv');
        res.attachment(`analytics-${urlId}.csv`);
        return res.send(csv);
      }

      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  // Helper method to calculate analytics summary
  calculateAnalyticsSummary(analytics) {
    const summary = {
      totalClicks: analytics.length,
      browsers: {},
      devices: {},
      operatingSystems: {},
      locations: {},
      referrers: {},
      clicksByDate: {},
      clicksByHour: Array(24).fill(0)
    };

    analytics.forEach(entry => {
      // Existing calculations
      summary.browsers[entry.browser] = (summary.browsers[entry.browser] || 0) + 1;
      summary.devices[entry.device] = (summary.devices[entry.device] || 0) + 1;
      summary.operatingSystems[entry.operatingSystem] = (summary.operatingSystems[entry.operatingSystem] || 0) + 1;
      summary.locations[entry.location] = (summary.locations[entry.location] || 0) + 1;
      summary.referrers[entry.referrer] = (summary.referrers[entry.referrer] || 0) + 1;
      
      // Click by date
      const date = entry.clickedAt.toISOString().split('T')[0];
      summary.clicksByDate[date] = (summary.clicksByDate[date] || 0) + 1;
      
      // Click by hour
      const hour = entry.clickedAt.getHours();
      summary.clicksByHour[hour]++;
    });

    return summary;
  }

  // Helper method to convert data to CSV
  convertToCSV(data) {
    // Implementation of CSV conversion
    // You can use libraries like json2csv
    // This is a simple implementation
    const headers = ['clickedAt', 'ipAddress', 'device', 'browser', 'operatingSystem', 'location', 'referrer'];
    const rows = data.analytics.map(entry => 
      headers.map(header => entry[header]).join(',')
    );
    
    return [headers.join(','), ...rows].join('\n');
  }
}

module.exports = new AnalyticsController();
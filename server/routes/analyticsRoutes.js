const express = require('express');
const AnalyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get analytics for a specific URL
router.get('/url/:urlId', authMiddleware, AnalyticsController.getUrlAnalytics);

// Get analytics for a specific time range
router.get('/url/:urlId/timerange', authMiddleware, AnalyticsController.getAnalyticsByTimeRange);

// Get analytics summary for all URLs owned by user
router.get('/summary', authMiddleware, AnalyticsController.getUserAnalyticsSummary);

// Get real-time analytics
router.get('/url/:urlId/realtime', authMiddleware, AnalyticsController.getRealTimeAnalytics);

// Get top performing URLs
router.get('/top-urls', authMiddleware, AnalyticsController.getTopPerformingUrls);

// Export analytics data
router.get('/url/:urlId/export', authMiddleware, AnalyticsController.exportAnalytics);

module.exports = router;
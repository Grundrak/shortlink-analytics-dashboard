const express = require('express');
const { getUrlAnalytics } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/url/:urlId', authMiddleware, async (req, res) => {
  await getUrlAnalytics(req, res);
});

module.exports = router;
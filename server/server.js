const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimiter = require('./middleware/rateLimiter');
const {errorHandler} = require('./middleware/errorHandler');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { redirectShortUrl } = require('./controllers/UrlController');

const logger = require('./utils/logger');

// Routes
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Initialize Prisma Client
const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(rateLimiter);

// Short link redirection route - Catch-all (Defined Last)
app.get('/:shortCode', async (req, res, next) => {
  await redirectShortUrl(req, res, next);
});

// API Routes - Defined First
app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);


// Error Handling Middleware
app.use(errorHandler);

// Start Server Function
const startServer = async () => {
  try {
    // Test Prisma connection
    await prisma.$connect();
    app.listen(process.env.PORT || 3000, () => {
      logger.info(`Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
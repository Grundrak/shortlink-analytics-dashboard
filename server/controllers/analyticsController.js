const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUrlAnalytics = async (req, res) => {
  const { urlId } = req.params;
  const userId = req.user.id;
  
  try {
    const url = await prisma.url.findUnique({
      where: { id: urlId },
      include: { analytics: true }
    });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    if (url.ownerId !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    res.status(200).json({ analytics: url.analytics });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve analytics', error: error.message });
  }
};

module.exports = { getUrlAnalytics };
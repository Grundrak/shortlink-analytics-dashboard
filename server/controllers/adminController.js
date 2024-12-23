const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, subscription: true, createdAt: true }
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
  }
};

const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['USER', 'ADMIN'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role }
    });
    res.status(200).json({ message: 'User role updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user role', error: error.message });
  }
};

module.exports = { getAllUsers, updateUserRole };
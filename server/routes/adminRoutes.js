const express = require('express');
const { getAllUsers, updateUserRole } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { check, validationResult } = require('express-validator');

const router = express.Router();


router.get('/users', authMiddleware, roleMiddleware('ADMIN'), async (req, res) => {
  await getAllUsers(req, res);
});


router.put('/users/:userId/role', authMiddleware, roleMiddleware('ADMIN'), [
  check('role').isIn(['USER', 'ADMIN'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await updateUserRole(req, res);
});

module.exports = router;
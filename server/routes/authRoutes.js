const express = require('express');
const { check, validationResult } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();


router.post('/register', [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  check('name').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await register(req, res);
});

router.post('/login', [
  check('email').isEmail(),
  check('password').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await login(req, res);
});

module.exports = router;
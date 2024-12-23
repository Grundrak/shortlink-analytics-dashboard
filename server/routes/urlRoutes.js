const express = require("express");
const { check, validationResult } = require("express-validator");
const { createShortLink, getUrl } = require("../controllers/UrlController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  [
    check("originalUrl").isURL(),
    check("customAlias")
      .optional()
      .isAlphanumeric()
      .isLength({ min: 3, max: 30 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await createShortLink(req, res, next);
  }
);

router.get("/", authMiddleware, async (req, res, next) => {
  await getUrl(req, res, next);
});

module.exports = router;

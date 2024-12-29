const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  createShortLink,
  getUrl,
  getAllUrls,
  deleteUrl,
} = require("../controllers/UrlController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a short URL
router.post(
  "/",
  authMiddleware,
  [
    check("originalUrl").isURL().withMessage("Please provide a valid URL."),
    check("customAlias")
      .optional()
      .isAlphanumeric()
      .withMessage("Custom alias must be alphanumeric.")
      .isLength({ min: 3, max: 30 })
      .withMessage("Custom alias must be between 3 and 30 characters."),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await createShortLink(req, res, next);
  }
);

// Get all URLs for authenticated user or all URLs for admin
router.get("/", authMiddleware, async (req, res, next) => {
  await getAllUrls(req, res, next);
});

// Redirect to original URL
router.get("/:shortCode", async (req, res, next) => {
  await getUrl(req, res, next);
});

// Delete a URL by shortCode or customAlias
router.delete("/:shortCode", authMiddleware, async (req, res, next) => {
  await deleteUrl(req, res, next);
});

module.exports = router;
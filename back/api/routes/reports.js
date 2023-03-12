const express = require("express");
const ReportsController = require("../controllers/reports");
const { validateClient } = require("../middlewares/auth");
const router = express.Router();

// GET REPORTS BY CLIENT AND BY BRANCH /api/reports/:id/:type/:startDate/:endDate
router.get(
  "/:id/:type/:startDate/:endDate",
  validateClient,
  ReportsController.reportsByType
);

module.exports = router;

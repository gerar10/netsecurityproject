const express = require("express");
const router = express.Router();
const clientRoutes = require("./clients");
const guardRoutes = require("./guards");
const branchRoutes = require("./branches");
const shiftRoutes = require("./shifts");
const guardShiftRoutes = require("./guardShifts");
const eventRoutes = require("./events");
const reportRoutes = require("./reports");

router.use("/clients", clientRoutes);
router.use("/guards", guardRoutes);
router.use("/branches", branchRoutes);
router.use("/shifts", shiftRoutes);
router.use("/guardShifts", guardShiftRoutes);
router.use("/events", eventRoutes);
router.use("/reports", reportRoutes);

module.exports = router;

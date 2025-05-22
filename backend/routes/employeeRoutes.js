const express = require("express");
const router = express.Router();
const { getProfile, submitLeaveRequest, submitExpenseClaim } = require("../controllers/EmployeeController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/dashboard", protect, getProfile);
router.post("/leave", protect, submitLeaveRequest);
router.post("/expense", protect, submitExpenseClaim);

module.exports = router;
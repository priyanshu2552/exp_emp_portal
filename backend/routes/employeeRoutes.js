const express = require("express");
const router = express.Router();
const { getProfile, submitLeaveRequest, submitExpenseClaim, getExpenses ,getLeaves} = require("../controllers/EmployeeController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/dashboard", protect, getProfile);
router.post("/leave", protect, submitLeaveRequest);
router.post("/expense", protect, submitExpenseClaim);
router.get("/expenses", protect, getExpenses);
router.get("/leaves", protect, getLeaves);
module.exports = router;
const express = require("express");
const router = express.Router();
const {
    getAdminDashboard,
    getAllExpenseRequests,
    getAllLeaveRequests,
    approveExpenseRequest,
    rejectExpenseRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    getAllEmployees,
    getEmployeeById
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.use(protect, adminOnly);


router.get("/dashboard", getAdminDashboard);
router.get("/expenses", getAllExpenseRequests);
router.get("/leaves", getAllLeaveRequests);
router.put("/expenses/:id/approve", approveExpenseRequest);
router.put("/expenses/:id/reject", rejectExpenseRequest);
router.put("/leaves/:id/approve", approveLeaveRequest);
router.put("/leaves/:id/reject", rejectLeaveRequest);
router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);

module.exports = router;

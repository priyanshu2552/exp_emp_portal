const Employee = require("../models/Employee");
const LeaveRequest = require("../models/LeaveRequest");
const Expense = require("../models/Expense");

// Get profile details
exports.getProfile = async (req, res) => {
  try {
    const user = await Employee.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile details" });
  }
};

// Submit leave request
exports.submitLeaveRequest = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    const leave = new LeaveRequest({
      employee: req.user.id,
      startDate,
      endDate,
      reason,
      status: "pending",
    });

    await leave.save();
    res.status(201).json({ message: "Leave request submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting leave request" });
  }
};

// Submit expense claim


exports.submitExpenseClaim = async (req, res) => {
  try {
    const {
      date,
      projectName,
      description,
      locationOfSite,
      localCategory,
      modeOfTravel,
      travelExpense = 0,
      foodExpense = 0,
      stayExpense = 0,
      receiptImage
    } = req.body;

    const total = travelExpense + foodExpense + stayExpense;

    const expense = new Expense({
      employee: req.user.id,
      date,
      projectName,
      description,
      locationOfSite,
      localCategory,
      modeOfTravel,
      travelExpense,
      foodExpense,
      stayExpense,
      total,
      receiptImage,
      status: "pending"
    });

    await expense.save();
    res.status(201).json({ message: "Expense claim submitted successfully" });
  } catch (error) {
  console.error("Submit Expense Error:", error); // This logs the full error in your terminal
  res.status(500).json({ message: "Error submitting expense claim", error: error.message });
}
};

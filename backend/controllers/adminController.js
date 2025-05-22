const Admin = require("../models/Admin");
const Leave = require("../models/LeaveRequest");
const Expense = require("../models/Expense");
const Employee = require("../models/Employee");
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments({ role: "Employee" });
    const pendingLeaves = await Leave.countDocuments({ status: "pending" });
    const pendingExpenses = await Expense.countDocuments({ status: "pending" });

    res.json({
      totalEmployees,
      pendingLeaves,
      pendingExpenses
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin dashboard data" });
  }
};

exports.getAllExpenseRequests = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("employee", "name email");

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employee", "name email");

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leave requests" });
  }
};

exports.approveExpenseRequest = async (req, res) => {
  try {
    await Expense.findByIdAndUpdate(req.params.id, { status: "approved" });
    res.json({ message: "Expense request approved" });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve expense request" });
  }
};

exports.rejectExpenseRequest = async (req, res) => {
  try {
    await Expense.findByIdAndUpdate(req.params.id, { status: "rejected" });
    res.json({ message: "Expense request rejected" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject expense request" });
  }
};

exports.approveLeaveRequest = async (req, res) => {
  try {
    await Leave.findByIdAndUpdate(req.params.id, { status: "approved" });
    res.json({ message: "Leave request approved" });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve leave request" });
  }
};

exports.rejectLeaveRequest = async (req, res) => {
  try {
    await Leave.findByIdAndUpdate(req.params.id, { status: "rejected" });
    res.json({ message: "Leave request rejected" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject leave request" });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ role: "employee" }).select("-password");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employee list" });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).select("-password");
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employee details" });
  }
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const Admin = require("../models/Admin");

exports.loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Employee.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "Employee not found" });

    const isMatch = password === user.password;
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: "employee" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    const isMatch = password === admin.password;
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ success: true, token, admin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

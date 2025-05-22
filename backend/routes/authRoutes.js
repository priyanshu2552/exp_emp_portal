const express = require("express");
const router = express.Router();
const { loginEmployee, loginAdmin } = require("../controllers/authController");

router.post("/employee/login", loginEmployee);
router.post("/admin/login", loginAdmin);

module.exports = router;
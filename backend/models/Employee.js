const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['Employee'],
        default: 'Employee',
    },
    profileImage: { type: String },
    designation: { type: String },
    joinDate: { type: Date },
    currentAddress: { type: String },
    contactNumber: { type: String },
    leavesTaken: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);

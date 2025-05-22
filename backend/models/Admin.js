const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['Admin'],
        default: 'Admin',
    },
    profileImage: { type: String },
    designation: { type: String },

    currentAddress: { type: String },
    contactNumber: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);

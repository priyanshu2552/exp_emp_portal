const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }
});

module.exports = mongoose.model('Holiday', holidaySchema);

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  date: { type: Date, required: true },
  projectName: { type: String },
  description: { type: String },
  locationOfSite: { type: String },
  localCategory: {
    type: String,
    enum: ['Local (within 50 km)', 'Local (> 50 km)', 'Out of station'],
    required: true
  },
  modeOfTravel: { type: String }, 
  travelExpense: { type: Number, default: 0 },
  foodExpense: { type: Number, default: 0 },
  stayExpense: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  receiptImage: { type: String }, 
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);

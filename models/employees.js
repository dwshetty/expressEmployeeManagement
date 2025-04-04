const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);

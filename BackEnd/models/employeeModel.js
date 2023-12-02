const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  employeeID: {
    type: String,
    require: [true,"Please add the employee ID"],
  },
  employeeName: {
    type: String,
    require: [true,"Please add the employee Name"],
  },
  employeeAge: {
    type: String,
    require: [true,"Please add the employee Age"],
  },
  employeeGender: {
    type: String,
    require: [true,"Please add the employee Gender"],
  },
  employeeDOJ: {
    type: String,
    require: [true,"Please add the employee DOJ"],
  },
  employeeRemarks: {
    type: String,
    require: [true,"Please add the employee Remark"],
  },
  employeeAcuredLeaves: {
    type: String,
    require: [true,"Please add the employee AcuredLeaves"],
  },
  
}, {
  timestamps: true,
});

module.exports = mongoose.model("Employee", employeeSchema);
const mongoose = require("mongoose");

const timeSchema = mongoose.Schema(
  {
    
    employeeID: {
      type: String,
      require: [true, "Please add the employee Id"],
    },
    checkInDateTime:{
      type: String,
      require: [true, "Please add the data and time check In"],
    },
   
    checkOutDateTime: {
        type: String,
        require: [true, "Please add the data and time  check out"],
      },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("time", timeSchema);

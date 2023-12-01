const mongoose = require("mongoose");

const holidaySchema = mongoose.Schema({
    holidayID: {
      type: String,
      require: [true,"Please add the holiday ID"],
    },
    holidayName: {
        type: String,
        require: [true,"Please add the holiday Name"],
      },
      holidayDateTime: {
        type: String,
        require: [true,"Please add the holiday DateTime"],
      },
    },{
        timestamps:true,
    });
    module.exports = mongoose.model("Holiday", holidaySchema);
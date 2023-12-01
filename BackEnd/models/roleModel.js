const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(
  {
    roleID: {
      type: String,
      require: [true, "Please add the role ID"],
    },
    roleName: {
      type: String,
      require: [true, "Please add the role Name"],
    },
    roleStatus: {
      type: String,
      require: [true, "Please add the role Status"],
    },
    roleDescription: {
      type: String,
      require: [true, "Please add the role Description"],
    },
    ruleRights: {
      type: String,
      require: [true, "Please add the rule Right"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("role", roleSchema);

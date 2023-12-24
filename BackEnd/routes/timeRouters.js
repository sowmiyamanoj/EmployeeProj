const express = require("express");
const router = express.Router();

const {
  getEmployeeDetails,
  getEmployeeDetail,
  saveTime,
  saveOutTime,
} = require("../controllers/timeController")

router.route("/").get(getEmployeeDetails);

router.route("/:id").get(getEmployeeDetail);

router.route("/checkIn").post(saveTime);
router.route("/checkOut").post(saveOutTime);


module.exports = router;

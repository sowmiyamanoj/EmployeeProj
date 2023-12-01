const express = require("express");
const router = express.Router();
const { getHolidays, 
  createHoliday, 
  getHoliday, 
  updateHoliday, 
  deleteHoliday
 } = require("../controllers/holidayController");



router.route("/").get(getHolidays).post(createHoliday);

router.route("/:id").get(getHoliday).put(updateHoliday).delete(deleteHoliday);

module.exports = router;
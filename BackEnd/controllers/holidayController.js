const asyncHandler = require("express-async-handler");
const Holiday = require("../models/holidayModel");

//Get all holidays
//route Get /api/holidays
//access public
const getHolidays = asyncHandler(async (req, res) => {
  const holidays = await Holiday.find();
  res.status(200).json(holidays);
});

//create new holiday
//route Post /api/holidays
//access public

const createHoliday = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const { holidayID, holidayName, holidayDateTime } = req.body;

  const holiday = await Holiday.create({
    holidayID,
    holidayName,
    holidayDateTime,
  });

  res.status(201).json(holiday);
});
//Get all holidays
//route Get /api/holidays/:id
//access public
const getHoliday = asyncHandler(async (req, res) => {
  const holiday = await Holiday.findOne({ holidayID: req.params.id });
  if (!Holiday) {
    res.status(404);
    throw new Error("Holiday not found");
  }
  res.status(200).json(holiday);
});

//update all holidays
//route Post /api/holidays
//access public

const updateHoliday = asyncHandler(async (req, res) => {
  const holiday = await Holiday.findOne({ holidayID: req.params.id });
  if (!holiday) {
    res.status(404);
    throw new Error("Holiday not found");
  }
  const updatedHoliday = await Holiday.findOneAndUpdate(
    { holidayID: req.params.id },
    req.body,
    { new: true }
  );

  res.status(200).json(updatedHoliday);
});

//Delete all holidays
//route Delete /api/holidays/:id
//access public

const deleteHoliday = async (req, res) => {
  try {
    const deleteHoliday = await Holiday.findOneAndDelete({
      holidayID: req.params.id,
    });
    if (!deleteHoliday) {
      return res.status(404).json({ message: "Holiday not found" });
    }
    res.status(200).json({ message: "Holiday deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getHolidays,
  createHoliday,
  getHoliday,
  updateHoliday,
  deleteHoliday,
};

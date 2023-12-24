const asyncHandler = require("express-async-handler");
const Time = require("../models/TimeModel");

// Get all employees
// route Get /api/employees
// access public
const getEmployeeDetails = asyncHandler(async (req, res) => {
  const employeeDetails = await Time.find();
  res.status(200).json(employeeDetails);
});

// Get individual employees
// route Get /api/employees/:id
// access public
const getEmployeeDetail = asyncHandler(async (req, res) => {
  const employeeDetail = await Time.findOne({ employeeID: req.param.id });
  if (!employeeDetail) {
    res.status(404);
    throw new Error("Employee not found");
  }
  res.status(200).json(employeeDetail);
});
 
// Create and save time data
// route POST /api/time
// access public
const saveTime = asyncHandler(async (req, res) => {
  // Assuming employeeID is coming from the request body
  const { employeeID } = req.body;

  // Create a new instance of the Time model with the provided data
  const newTimeData = new Time({
    employeeID,
    checkInDateTime: new Date(), // Generate current date and time
    
  });

  // Save the time data to the database
  const result = await newTimeData.save();

  res
    .status(201)
    .json({ message: "Time data saved successfully", data: newTimeData });
});
const saveOutTime = asyncHandler(async (req, res) => {
  
  const { employeeID } = req.body;

  // Create a new instance of the Time model with the provided data
  const newOutTimeData = new Time({
    employeeID,
   
    checkOutDateTime: new Date(), // Generate current date and time
  });

  // Save the time data to the database
  const result = await newOutTimeData.save();

  res
    .status(201)
    .json({ message: "Time data saved successfully", data: newOutTimeData });
});

module.exports = {
  getEmployeeDetails,
  getEmployeeDetail,
  saveTime,
  saveOutTime,
};

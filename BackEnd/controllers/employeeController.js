const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");

// Get all employees
// route Get /api/employees
// access public
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json(employees);
});

// Create New employees
// route Post /api/employees
// access public
const createEmployee = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const {
    employeeID,
    employeeName,
    employeeAge,
    employeeGender,
    employeeDOJ,
    employeeRemarks,
    employeeAcuredLeaves
  } = req.body;

  const employee = await Employee.create({
    employeeID,
    employeeName,
    employeeAge,
    employeeGender,
    employeeDOJ,
    employeeRemarks,
    employeeAcuredLeaves
  });

  res.status(201).json(employee);
});

// Get individual employees
// route Get /api/employees/:id
// access public
const getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ employeeID: req.params.id });
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }
  res.status(200).json(employee);
});

// Update all employees
// route Post /api/employees
// access public
const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ employeeID: req.params.id });
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  const updatedEmployee = await Employee.findOneAndUpdate(
    { employeeID: req.params.id },
    req.body,
    { new: true }
  );

  res.status(200).json(updatedEmployee);
});

// Delete all employees
// route Delete /api/employees/:id
// access public
const deleteEmployee = async (req, res) => {
  try {
    const deleteEmployee = await Employee.findOneAndDelete({
      employeeID: req.params.id
    });
    if (!deleteEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee
};

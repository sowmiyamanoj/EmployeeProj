const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");

//Get all employees
//route Get /api/employees
//access public
const getEmployees = asyncHandler (async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json(employees);
});

//Create New employees
//route Post /api/employees
//access public
const createEmployee = asyncHandler (async (req, res) => {
  console.log("The request body is:", req.body);
  const{employeeID, employeeName, employeeAge, employeeGender, employeeDOJ, employeeRemarks, employeeAcuredLeaves} = req.body;
  if(!employeeID || !employeeName || !employeeAge || !employeeGender ||!employeeDOJ || !employeeRemarks || !employeeAcuredLeaves){
    res.status(400);
    throw new Error("All fields are mandatory !");
  }

  const Employee = await Employee.create({
    employeeID, 
    employeeName, 
    employeeAge, 
    employeeGender, 
    employeeDOJ, 
    employeeRemarks, 
    employeeAcuredLeaves
  });

  res.status(201).json(Employee);
});


//Get all employees
//route Get /api/employees/:id
//access public
const getEmployee = asyncHandler (async (req, res) => {
  const Employee = await Employee.findById(req.params.id);
  if(!Employee){
    res.status(404);
    throw new Error("Employee not found");
  }
  res.status(200).json(Employee);
});


//Update all employees
//route Post /api/employees
//access public
const updateEmployee = asyncHandler (async (req, res) => {
  const Employee = await Employee.findById(req.params.id);
  if(!Employee){
    res.status(404);
    throw new Error("Employee not found");
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true}
  );
  
  res.status(200).json(updatedEmployee);
  
});


//Delete all employees
//route Delete /api/employees/:id
//access public
const deleteEmployee = asyncHandler (async (req, res) => {
  const Employee = await Employee.findById(req.params.id);
  if(!Employee){
    res.status(404);
    throw new Error("Employee not found");
  }
  await Employee.remove();
  res.status(200).json(Employee);
});


module.exports ={
  getEmployees, 
  createEmployee, 
  getEmployee, 
  updateEmployee, 
  deleteEmployee};
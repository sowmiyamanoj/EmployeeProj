const express = require("express");
const router = express.Router();
const { getEmployees, 
  createEmployee, 
  getEmployee, 
  updateEmployee, 
  deleteEmployee
 } = require("../controllers/employeeController");



router.route("/").get(getEmployees).post(createEmployee);

router.route("/:id").get(getEmployee).put(updateEmployee).delete(deleteEmployee);

module.exports = router;



/*router.route("/").get((req,res) =>{
  res.status(200).json({message: "Get all Employees"});
});
router.route("/").post((req,res) =>{
  res.status(200).json({message: "Create Employees"});
});
router.route("/:id").get((req,res) =>{
  res.status(200).json({message: `Get Employees for ${req.params.id}`});
});
router.route("/:id").put((req,res) =>{
  res.status(200).json({message: `Update Employees for ${req.params.id}`});
});
router.route("/:id").delete((req,res) =>{
  res.status(200).json({message:  `Update Employees for ${req.params.id}`});
});

*/
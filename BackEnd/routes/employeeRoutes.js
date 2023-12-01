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

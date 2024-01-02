const express = require('express');
const router = express.Router();

const service = require('../services/employeeService')


router.get('/', async (req, res) =>{
  const employees = await service.getAllEmployees()
  res.send(employees)
})


router.get('/:id', async (req, res) =>{
  const employee = await service.getEmployeesID(req.params.id)
  if(employee.length == 0)
  res.status(404).json('no record with given id : ' + req.params.id)
  else
  res.send(employee)
})


router.delete('/:id', async (req, res) =>{
  const affectedRows = await service.deleteEmployee(req.params.id)
  if(affectedRows == 0)
  res.status(404).json('no record with given id : ' + req.params.id)
  else
  res.send('delete successfully.')
})


router.post('/', async (req, res) =>{
 await service.createEmployee(req.body)
  res.status(201).send('create successfully.')
})


router.put('/:id', async (req, res) =>{
  const affectedRows = await service.updateEmployee(req.body,req.params.id)
  if(affectedRows == 0)
  res.status(404).json('no record with given id : ' + req.params.id)
  else
  res.send('updated successfully.')
})


module.exports = router;
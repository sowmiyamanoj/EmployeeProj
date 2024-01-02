const express = require('express');
const router = express.Router();

const service = require('../services/roleService')

router.get('/', async (req, res) =>{
  const roles = await service.getAllRoles()
  res.send(roles)
})

router.get('/:id', async (req, res) =>{
  const role = await service.getRoleID(req.params.id)
  if(role.length == 0)
  res.status(404).json('no record with given id : ' + req.params.id)
  else
  res.send(role)
})

router.delete('/:id', async (req, res) =>{
  const affectedRows = await service.deleteRole(req.params.id)
  if(affectedRows == 0)
  res.status(404).json('no record with given id : ' + req.params.id)
  else
  res.send('delete successfully.')
})

router.post('/', async (req, res) =>{
 await service.createRole(req.body)
  res.status(201).send('create successfully.')
})

router.put('/:id', async (req, res) =>{
  const affectedRows = await service.updateRole(req.body,req.params.id)
  if(affectedRows == 0)
  res.status(404).json('no record with given id : ' + req.params.id)
  else
  res.send('updated successfully.')
})


module.exports = router;
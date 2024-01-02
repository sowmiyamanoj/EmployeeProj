
const express = require('express');
const router = express.Router();

const service = require('../services/holidayService')


router.get('/', async (req, res) =>{
  const holidays = await service.getAllHolidays()
  res.send(holidays)
})

router.get('/:id', async (req, res) => {
  try {
    // Assuming `getEmployeeByID` is a function in your service to retrieve an employee by ID
    const holiday = await service.getHolidayByID(req.params.id);

    if (!holiday) {
      res.status(404).json('No record with the given ID: ' + req.params.id);
    } else {
      res.send(holiday);
    }
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});



router.delete('/:id', async (req, res) =>{
  const affectedRows = await service.deleteHoliday(req.params.id)
  if(affectedRows == 0)
  res.status(404).json('no record with given id : ' + req.params.id)
  else
  res.send('delete successfully.')
})


router.post('/', async (req, res) =>{
 await service.createHoliday(req.body)
  res.status(201).send('create successfully.')
})


router.put('/:id', async (req, res) =>{
  const affectedRows = await service.updateHoliday(req.body,req.params.id)
  if(affectedRows == 0)
  res.status(404).json('no record with given id : ' + req.params.id)
  else
  res.send('updated successfully.')
})


module.exports = router;
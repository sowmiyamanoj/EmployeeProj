const express = require('express');
const router = express.Router();

const service = require('../services/timeService')


router.get('/', async (req, res) =>{
  const employeeDetails = await service.getAllEmployeeDetails()
  res.send(employeeDetails)
})
router.get('/:id', async (req, res) => {
  const employeeDetails = await service.getEmployeeDetailsByID(req.params.id);

  if (employeeDetails.length === 0) {
    res.status(404).json('no record with given id : ' + req.params.id);
  } else {
    res.send(employeeDetails);
  }
});



router.post('/checkout', async (req, res) => {
  const checkOutData = req.body;
  await service.createCheckOut(checkOutData);
  res.status(201).send('Checkout successfully.');
});


router.post('/checkin', async (req, res) => {
  const checkInData = req.body;
  await service.createCheckIn(checkInData);
  res.status(201).send('Checkin successfully.');
});
 



module.exports = router;
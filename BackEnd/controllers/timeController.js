const express = require('express');
const router = express.Router();

const service = require('../services/timeService');

router.get('/', async (req, res) => {
  const employeeDetails = await service.getAllEmployeeDetails();
  const formattedDetails = formatDateResults(employeeDetails);
  res.send(formattedDetails);
});

router.get('/:id', async (req, res) => {
  const employeeDetails = await service.getEmployeeDetailsByID(req.params.id);

  if (employeeDetails.length === 0) {
    res.status(404).json('no record with given id : ' + req.params.id);
  } else {
    const formattedDetails = formatDateResults(employeeDetails);
    res.send(formattedDetails);
  }
});

router.get('/date/:startdate', async (req, res) => {
  const employeeDetails = await service.getEmployeeDetailsByDate(req.params.startdate);

  if (employeeDetails.length === 0) {
    res.status(404).json('no record with given date : ' + req.params.startdate);
  } else {
    const formattedDetails = formatDateResults(employeeDetails);
    res.send(formattedDetails);
  }
});

router.get('/:id/:date', async (req, res) => {
  const employeeDetails = await service.getEmployeeDetailsByIDanddate(req.params.id,req.params.date);

  if (employeeDetails.length === 0) {
    res.status(404).json('no record with given id & Date : ' + req.params.id +" "+ req.params.date);
  } else {
    const formattedDetails = formatDateResults(employeeDetails);
    res.send(formattedDetails);
  }
});

router.get('/:id/:startdate/:enddate', async (req, res) => {
  const employeeDetails = await service.getEmployeeDetailsByIDanddates(req.params.id, req.params.startdate,req.params.enddate );

  if (employeeDetails.length === 0) {
    res.status(404).json('no record with given id : ' + req.params.id);
  } else {
    const formattedDetails = formatDateResults(employeeDetails);
    res.send(formattedDetails);
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

// Utility function to format the date in 'YYYY-MM-DD' format
function formatDateResults(results) {
  return results.map(record => ({
    ...record,
    date: formatDate(record.date)
  }));
}

function formatDate(date) {
  if (!date) return null; // Return null if the date is null

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


module.exports = router;

// timeController.js

const express = require('express');
const router = express.Router();
const service = require('../services/timeService');
const { handleErrors } = require('../middleware/errorMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const timeEntries = await service.getAllEmployeeDetails();
    const formattedEntries = formatTimeResults(timeEntries);
    res.send(formattedEntries);
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handling)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const timeEntries = await service.getEmployeeDetailsByID(req.params.id);

    if (timeEntries.length === 0) {
      res.status(404).json('No time records found for employee with id: ' + req.params.id);
    } else {
      const formattedEntries = formatTimeResults(timeEntries);
      res.send(formattedEntries);
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handling)
  }
});

router.get('/date/:startdate', async (req, res, next) => {
  try {
    const timeEntries = await service.getEmployeeDetailsByDate(req.params.startdate);

    if (timeEntries.length === 0) {
      res.status(404).json('No time records found for date: ' + req.params.startdate);
    } else {
      const formattedEntries = formatTimeResults(timeEntries);
      res.send(formattedEntries);
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handling)
  }
});

router.get('/:id/:date', async (req, res, next) => {
  try {
    const timeEntries = await service.getEmployeeDetailsByIDanddate(req.params.id, req.params.date);

    if (timeEntries.length === 0) {
      res.status(404).json('No time records found for employee with id and date: ' + req.params.id + " " + req.params.date);
    } else {
      const formattedEntries = formatTimeResults(timeEntries);
      res.send(formattedEntries);
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handling)
  }
});

router.get('/:id/:startdate/:enddate', async (req, res, next) => {
  try {
    const timeEntries = await service.getEmployeeDetailsByIDanddates(req.params.id, req.params.startdate, req.params.enddate);

    if (timeEntries.length === 0) {
      res.status(404).json('No time records found for employee with id: ' + req.params.id);
    } else {
      const formattedEntries = formatTimeResults(timeEntries);
      res.send(formattedEntries);
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handling)
  }
});

// In your timeController.js file
router.post('/checkin', async (req, res, next) => {
  try {
    const checkInData = req.body;
    const employeeIDFromToken = req.user.employeeID; // Assuming userId corresponds to the employeeID
    await service.createCheckIn(checkInData, employeeIDFromToken);
    res.status(201).send('Checkin successfully.');
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.status(404).send('Employee Not Found or Already Checked In');
    } else if (error.name === 'CheckInError') {
      res.status(400).send(error.message);
    } else {
      // Log the unexpected error for debugging purposes
      console.error('Unexpected error during check-in:', error);
      res.status(500).send('Internal Server Error');
    }
  }
});

router.post('/checkout', async (req, res, next) => {
  try {
    const checkOutData = req.body;
    const employeeIDFromToken = req.user.employeeID; // Use the same property as in the check-in route

    // Call the createCheckOut function and handle the result
    const result = await service.createCheckOut(checkOutData, employeeIDFromToken);

    if (result === 'NotFound') {
      res.status(404).send('Employee Not Found or No Check-In Record Found');
    } else if (result === 'Success') {
      res.status(201).send('Checkout successfully.');
    } else {
      // Log the unexpected error for debugging purposes
      console.error('Unexpected error during checkout.');
      res.status(500).send('Internal Server Error');
    }
  } catch (error) {
    // Handle unexpected errors
    console.error('Unexpected error during checkout:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Utility function to format the date in 'YYYY-MM-DD' format
function formatTimeResults(results) {
  return results.map(entry => ({
    ...entry,
    date: formatDate(entry.date),
    checkInDateTime: formatDateTime(entry.checkInDateTime),
    checkOutDateTime: formatDateTime(entry.checkOutDateTime),
  }));
}

function formatDate(date) {
  if (!date) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatDateTime(dateTime) {
  if (!dateTime) return null;

  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const day = String(dateTime.getDate()).padStart(2, '0');
  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  const seconds = String(dateTime.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Use the error handling middleware
router.use(handleErrors);

module.exports = router;
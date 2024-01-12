const express = require('express');
const router = express.Router();

const service = require('../services/payslipService')

router.get("/payslips/:id", async (req, res) => {
  try {
    const paySlip = await service.generatePaySlip(req.params.id);
    res.status(200).json(paySlip);
  } catch (error) {
    console.error("Error generating pay slip:", error);
    res.status(500).send("Error generating pay slip");
  }
});


module.exports = router;
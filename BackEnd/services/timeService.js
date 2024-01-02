// employeeService.js
const db = require("../config/db");

module.exports.getAllEmployeeDetails = async () => {
  const [records] = await db.query("SELECT * FROM timerdetails");
  return records;
};

module.exports.getEmployeeDetailsByID = async (id) => {
  const [records] = await db.query("SELECT * FROM timerdetails WHERE employeeID = ?", [id]);
  return records;
};

module.exports.createCheckIn = async (checkInData) => {
  const { employeeID } = checkInData;
  const checkInDateTime = new Date();
  const [result] = await db.query(
    "INSERT INTO `timerdetails` (`employeeID`, `checkInDateTime`) VALUES (?, ?)",
    [employeeID, checkInDateTime]
  );
  return result.insertId;
};

module.exports.createCheckOut = async (checkOutData) => {
  const { employeeID } = checkOutData;
  const checkOutDateTime = new Date();
  
  const [checkInRecord] = await db.query(
    "SELECT checkInDateTime FROM `timerdetails` WHERE `employeeID` = ? AND `checkOutDateTime` IS NULL",
    [employeeID]
  );

  if (checkInRecord.length === 0) {
    return 0; 
  }

  const checkInTime = new Date(checkInRecord[0].checkInDateTime);
  const timeDifference = checkOutDateTime - checkInTime;
  const workingHours = timeDifference / (1000 * 60 * 60); 
  const [result] = await db.query(
    "UPDATE `timerdetails` SET `checkOutDateTime` = ?, `totalWorkingHours` = TIME_FORMAT(?, '%H:%i:%s') WHERE `employeeID` = ? AND `checkOutDateTime` IS NULL",
    [checkOutDateTime, new Date(workingHours * 60 * 60 * 1000).toISOString().substr(11, 8), employeeID]
  );

  return result.affectedRows;
};

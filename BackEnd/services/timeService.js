const db = require("../config/db");

module.exports.getAllEmployeeDetails = async () => {
  const [records] = await db.query("SELECT * FROM timerdetails");
  return records;
};

module.exports.getEmployeeDetailsByID = async (id) => {
  const [records] = await db.query("SELECT * FROM timerdetails WHERE employeeID = ?", [id]);
  return records;
};

module.exports.getEmployeeDetailsByIDanddate = async (id ,date) => {
  const [records] = await db.query("SELECT * FROM timerdetails WHERE employeeID = ? AND DATE (date) = ?", [id, date]);
  return records;
};

module.exports.getEmployeeDetailsByIDanddates = async (id ,startdate ,enddate) => {
  const [records] = await db.query("SELECT * FROM timerdetails WHERE (date BETWEEN ? and ? ) AND (employeeID = ?) ORDER BY date DESC;", [startdate,enddate,id]);
  return records;
};

module.exports.getEmployeeDetailsByDate = async (startdate) => {
  const [records] = await db.query("SELECT * FROM timerdetails where date = ? ", [startdate]);
  return records;
};

module.exports.createCheckIn = async (checkInData) => {
  const { employeeID } = checkInData;
  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in 'YYYY-MM-DD' format
  const checkInDateTime = new Date();
  const [result] = await db.query(
    "INSERT INTO `timerdetails` (`employeeID`, `checkInDateTime`, `date`) VALUES (?, ?, ?)",
    [employeeID, checkInDateTime, currentDate]
  );
  return result.insertId;
};

module.exports.createCheckOut = async (checkOutData) => {
  const { employeeID } = checkOutData;
  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in 'YYYY-MM-DD' format
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
    "UPDATE `timerdetails` SET `checkOutDateTime` = ?, `totalWorkingHours` = TIME_FORMAT(?, '%H:%i:%s'), `date` = ? WHERE `employeeID` = ? AND `checkOutDateTime` IS NULL",
    [checkOutDateTime, new Date(workingHours * 60 * 60 * 1000).toISOString().substr(11, 8), currentDate, employeeID]
  );

  return result.affectedRows;
};

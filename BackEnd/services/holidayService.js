const db = require("../config/db");

module.exports.getAllHolidays = async () => {
  const [records] = await db.query("SELECT * FROM holiday");
  return records;
};

module.exports.getHolidayByID = async (id) => {
  const [records] = await db.query(
    "SELECT * FROM holiday WHERE holidayID = ?",
    [id]
  );
  return records;
};

module.exports.updateHoliday = async(update,id) =>{
  const {holidayName=req.body.holidayName,
   holidayDateTime = req.body.holidayDateTime
} =update;
const [result] =await db.query(
'UPDATE holiday SET holidayName =?,holidayDateTime=? where holidayID =?',[
  holidayName,
  holidayDateTime,
  id
]
);
return result.affectedRows;
}

module.exports.deleteHoliday = async (id) => {
  const [{ affectedRows }] = await db.query(
    "DELETE FROM holiday WHERE holidayID = ?",
    [id]
  );
  return affectedRows;
};

/* module.exports.createEmployee = async (obj) => {
  const [{affectedRows}] = await db.query("CALL employee(?,?,?,?,?,?,?,?)", 
  [obj.employeeID,obj.employeeName, obj.employeeAge,obj.employeeGender,
    obj.employeeDOJ,obj.employeeRemarks,obj.employeeAcuredLeaves,obj.roleID])
  return affectedRows;
}

module.exports.updateEmployee = async (obj,id = 0) => {
  const [[[{affectedRows}]]] = await db.query("CALL employee(?,?,?,?,?,?,?,?)", 
  [id,obj.employeeID,obj.employeeName, obj.employeeAge,obj.employeeGender,
    obj.employeeDOJ,obj.employeeRemarks,obj.employeeAcuredLeaves,obj.roleID])
  return affectedRows;
} */

module.exports.createHoliday = async (holidayData) => {
  const {
    holidayID,
    holidayName,
    holidayDateTime,
   
  } = holidayData;
  const [result] = await db.query(
    "INSERT INTO `holiday` (`holidayID`, `holidayName`, `holidayDateTime`) VALUES (?, ?,?)",
    [
      holidayID,
      holidayName,
      holidayDateTime,
     
      
    ]
  );
  
  return result.insertId;
};

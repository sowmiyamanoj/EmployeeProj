const db = require("../config/db");

module.exports.getAllEmployees = async () => {
  const [records] = await db.query("SELECT * FROM employee");
  return records;
};

module.exports.getEmployeesID = async (id) => {
  const [records] = await db.query(
    "SELECT * FROM employee WHERE employeeID = ?",
    [id]
  );
  return records;
};

module.exports.deleteEmployee = async (id) => {
  const [{ affectedRows }] = await db.query(
    "DELETE FROM employee WHERE employeeID = ?",
    [id]
  );
  return affectedRows;
};

module.exports.createEmployee = async (employeeData) => {
  const {
    employeeID,
    employeeName,
    employeeAge,
    employeeGender,
    employeeDOJ,
    employeeRemarks,
    employeeAcuredLeaves,
    roleID,
  } = employeeData;
  const [result] = await db.query(
    "INSERT INTO employee (employeeID, employeeName, employeeAge,employeeGender,employeeDOJ,employeeRemarks,employeeAcuredLeaves,roleID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      employeeID,
      employeeName,
      employeeAge,
      employeeGender,
      employeeDOJ,
      employeeRemarks,
      employeeAcuredLeaves,
      roleID,
    ]
  );
  return result.insertId;
};

module.exports.updateEmployee = async (update, id) =>{
  const {
    employeeName = req.body.employeeName,
    employeeAge = req.body.employeeAge,
    employeeGender = req.body.employeeGender,
    employeeDOJ = req.body.employeeDOJ,
    employeeRemarks = req.body.employeeRemarks,
    employeeAcuredLeaves = req.body.employeeAcuredLeaves,
    roleID = req.body.roleID,
  } = update;
  const [result] = await db.query(
    'UPDATE employee SET employeeName = ?, employeeAge = ?, employeeGender = ?, employeeDOJ = ?, employeeRemarks = ?,employeeAcuredLeaves = ?, roleID = ? WHERE employeeID = ?',
    [
      employeeName,
      employeeAge,
      employeeGender,
      employeeDOJ,
      employeeRemarks,
      employeeAcuredLeaves,
      roleID,
      id,
    ]
  );
  return result.affectedRows;
};
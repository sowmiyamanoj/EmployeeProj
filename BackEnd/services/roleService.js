const db = require("../config/db");

module.exports.getAllRoles = async () => {
  const [records] = await db.query("SELECT * FROM roles");
  return records;
};

module.exports.getRoleID = async (id) => {
  const [records] = await db.query(
    "SELECT * FROM roles WHERE roleID = ?",
    [id]
  );
  return records;
};

module.exports.deleteRole = async (id) => {
  const [{ affectedRows }] = await db.query(
    "DELETE FROM roles WHERE roleID = ?",
    [id]
  );
  return affectedRows;
};

module.exports.createRole = async (rolesData) => {
  const {
  roleID,
  roleName,
  roleStatus,
  createdDate,
  roleDescription,
  ruleRights,
  } = rolesData;
  const [result] = await db.query(
    "INSERT INTO roles (roleID, roleName, roleStatus, createdDate, roleDescription, ruleRights) VALUES (?, ?, ?, ?, ?, ?)",
    [
      roleID,
      roleName,
      roleStatus,
      createdDate,
      roleDescription,
      ruleRights,
    ]
  );
  return result.insertId;
};

module.exports.updateRole = async (update, id) =>{
  const {
      roleName = req.body.roleName,
      roleStatus = req.body.roleStatus,
      createdDate = req.body.createdDate,
      roleDescription = req.body.roleDescription,
      ruleRights = req.body.ruleRights,

  } = update;
  const [result] = await db.query(
    'UPDATE roles SET roleName = ?, roleStatus = ?, createdDate = ?, roleDescription = ?, ruleRights = ? WHERE roleID = ?',
    [
      roleName,
      roleStatus,
      createdDate,
      roleDescription,
      ruleRights,
      id,
    ]
  );
  return result.affectedRows;
};
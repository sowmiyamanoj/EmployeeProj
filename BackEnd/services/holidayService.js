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
  return records[0]; // Assuming you want to return the first record if found
};

module.exports.updateHoliday = async (update, id) => {
  const { holidayName = update.holidayName, holidayDateTime = update.holidayDateTime } = update;
  const [result] = await db.query(
    'UPDATE holiday SET holidayName = ?, holidayDateTime = ? WHERE holidayID = ?',
    [holidayName, holidayDateTime, id]
  );
  return result.affectedRows;
};

module.exports.deleteHoliday = async (id) => {
  const [{ affectedRows }] = await db.query(
    "DELETE FROM holiday WHERE holidayID = ?",
    [id]
  );
  return affectedRows;
};

module.exports.createHoliday = async (holidayData) => {
  const { holidayName, holidayDateTime } = holidayData;
  const [result] = await db.query(
    "INSERT INTO holiday (holidayName, holidayDateTime) VALUES (?, ?)",
    [holidayName, holidayDateTime]
  );
  return result.insertId;
};

// passwordService.js

const bcrypt = require('bcrypt');
const db = require('../config/db');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const updatePasswordById = async (newPassword, employeeID) => {
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await db.query(
      'UPDATE employee SET password = ? WHERE employeeID = ?',
      [hashedPassword, employeeID]
    );

    return result.affectedRows;
  } catch (error) {
    console.error('Error in updatePasswordById:', error.message);
    throw error;
  }
};

module.exports = {
  hashPassword,
  updatePasswordById,
};

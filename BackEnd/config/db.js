const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
  host:'sql12.freesqldatabase.com',
  user:'sql12673713',
  password:'cniqKywni6',
  database:'sql12673713',
})


module.exports = mysqlPool;
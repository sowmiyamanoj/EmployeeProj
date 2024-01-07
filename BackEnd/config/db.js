const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
  host:'sql12.freesqldatabase.com',
  user:'sql12675141',
  password:'njikC2Hnyz',
  database:'sql12675141',
  
})


module.exports = mysqlPool;
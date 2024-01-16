const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
  host:'sql12.freesqldatabase.com',
  user:'sql12677318',
  password:'VKUppXQLhF',
  database:'sql12677318',
  
})

module.exports=mysqlPool;
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDb();

const app = express();
app.use(cors());
const port = process.env.PORT || 5006;

app.use(express.json());

app.use("/api/employees", require("./routes/employeeRoutes"));
app.use(errorHandler);

app.listen(port, ()=>{
  console.log(`Server running on port ${port} `);
});

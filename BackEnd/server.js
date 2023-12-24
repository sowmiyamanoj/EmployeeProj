const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const roleErrorHandler = require("./middleware/roleErrorHandler");
const holidayErrorHandler = require("./middleware/holidayErrorHandler");

connectDb();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/employees", require("./routes/employeeRoutes"));
app.use(errorHandler);

app.use(express.json());

app.use("/api/role", require("./routes/roleRoutes"));
app.use(roleErrorHandler);

app.use(express.json());

app.use("/api/holidays", require("./routes/holidayRoutes"));
app.use(holidayErrorHandler);

app.use("/api/time", require("./routes/timeRouters"));

app.listen(port, () => {
  console.log(`Server running on port ${port} `);
});

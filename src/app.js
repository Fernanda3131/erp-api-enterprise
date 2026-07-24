const express = require("express");

const app = express();


app.use(express.json());


const employeeRoutes = require("./routes/employee.routes");
const vendorRoutes = require("./routes/vendor.routes");
const shoppingRoutes = require("./routes/shopping.router");


app.use("/employees", employeeRoutes);
app.use("vendor", vendorRoutes);
app.use("shopping",shoppingRoutes);


module.exports = app;
import express from "express";
import employeeRoutes from "./routes/employee.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
//import shoppingRoutes from "./routes/shopping.router.js";

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Definición de rutas
app.use("/employees", employeeRoutes);
app.use("/vendor", vendorRoutes);   
//app.use("/shopping", shoppingRoutes); 

export default app;
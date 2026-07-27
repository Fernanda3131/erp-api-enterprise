import express from "express";
import employeeRoutes from "./routes/employee.routes.js";


const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Definición de rutas
app.use("/employees", employeeRoutes);

export default app;
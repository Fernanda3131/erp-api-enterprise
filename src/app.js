import express from "express";
import employeeRoutes from "./routes/employee.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middleware para procesar JSON
app.use(express.json());
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
app.use(loggerMiddleware);

// Definición de rutas
app.use("/employees", employeeRoutes);

app.use("/api/auth", authRoutes);

export default app;
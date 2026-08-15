import express from "express";
import cors from "cors";

import employeeRoutes from "./routes/employee.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";

const app = express();
app.use(cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

app.use(loggerMiddleware);

app.use("/employees", employeeRoutes);

app.use("/api/auth", authRoutes);


export default app;
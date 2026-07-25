// routes/employee.routes.js
import { Router } from "express";
import { getEmployees, createEmployee, deleteEmployee, getEmployeesId, UpdateEmployee } from "../controllers/employee.controller.js";

const router = Router();

// 1. Obtener todos los empleados (GET)
router.get("/", getEmployees);

router.get("/:id", getEmployeesId);

// 2. Crear un nuevo empleado (POST)
router.post("/", createEmployee);

router.put("/:id", UpdateEmployee)

// 3. Eliminar un empleado por ID (DELETE)
router.delete("/:id", deleteEmployee);

export default router;
import { Router } from "express";
import {
    getEmployeesCont,
    getEmployeeByIdCont,
    createEmployeeCont,
    updateEmployeeCont,
    deleteEmployeeCont
} from "../controllers/employee.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", verifyToken, getEmployeesCont);

router.get("/:id", verifyToken, getEmployeeByIdCont);

router.post("/", verifyToken, createEmployeeCont);

router.put("/:id",verifyToken, updateEmployeeCont);

router.delete("/:id", verifyToken, deleteEmployeeCont);

export default router;
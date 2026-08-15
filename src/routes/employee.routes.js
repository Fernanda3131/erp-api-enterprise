import { Router } from "express";
import {
    getEmployeesCont,
    getEmployeeByIdCont,
    createEmployeeCont,
    updateEmployeeCont,
    deleteEmployeeCont
} from "../controllers/employee.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
const router = Router();

router.get("/", verifyToken, authorize("employees.read"),  getEmployeesCont);

router.get("/:id", verifyToken, authorize("employees.read"), getEmployeeByIdCont);

router.post("/", verifyToken, authorize("employees.create"), createEmployeeCont);

router.put("/:id",verifyToken, authorize("employees.update"), updateEmployeeCont);

router.delete("/:id", verifyToken, authorize("employees.delete"), deleteEmployeeCont);

export default router;
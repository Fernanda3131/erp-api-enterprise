import { Router } from "express";
import {
    getEmployeesCont,
    getEmployeeByIdCont,
    createEmployeeCont,
    updateEmployeeCont,
    deleteEmployeeCont
} from "../controllers/employee.controller.js";

const router = Router();

router.get("/", getEmployeesCont);

router.get("/:id", getEmployeeByIdCont);

router.post("/", createEmployeeCont);

router.put("/:id", updateEmployeeCont);

router.delete("/:id", deleteEmployeeCont);

export default router;
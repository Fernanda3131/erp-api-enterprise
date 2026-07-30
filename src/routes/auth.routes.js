import { Router } from "express";
import { loginCont, registerCont } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginCont);
router.post("register", registerDB);

export default router;
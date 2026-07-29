import { Router } from "express";
import { loginCont } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginCont);

export default router;
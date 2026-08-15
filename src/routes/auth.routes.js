import { Router } from "express";
import {
    loginCont,
    registerCont,
    getMeCont
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", loginCont);
router.post("/register", registerCont);
router.get("/me", verifyToken, getMeCont);
export default router;
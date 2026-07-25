import { Router } from "express";
import getVendors from "../controllers/vendor.controller.js"; // 👈 Se corrigió la coma por punto

const router = Router();

router.get("/", getVendors);

export default router;
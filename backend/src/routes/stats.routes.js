import { Router } from "express";
import { urlStats } from "../services/stats.service.js";

const router = Router();

router.get("/:shortUrl/stats", urlStats);

export default router

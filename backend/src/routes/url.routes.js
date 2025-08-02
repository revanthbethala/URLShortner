import { Router } from "express";
import { getAllUrls, getUrl, shortUrl } from "../services/url.service.js";

const router = Router();

router.post("/shortUrls", shortUrl);
router.get("/shortUrls", getAllUrls);
router.get("/:shortCode", getUrl);
export default router;

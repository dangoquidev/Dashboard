import express from "express";

import { searchAnime } from "./anime.controller";
import { authenticateToken } from "../middlewares/auth";

const router = express.Router();

router.post("/search", authenticateToken, searchAnime);

export default router;

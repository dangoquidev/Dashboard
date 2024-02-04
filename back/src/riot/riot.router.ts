import express from "express";

import { getMatchHistory, getRankInfo } from "./riot.controller";
import { authenticateToken } from "../middlewares/auth";

const router = express.Router();

router.post("/getMatchHistory", authenticateToken, getMatchHistory);

router.post("/getRankInfo", authenticateToken, getRankInfo);

export default router;

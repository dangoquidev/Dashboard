import express from "express";

import { getMatchHistory, getRankInfo } from "./riot.controller";

const router = express.Router();

router.get("/getMatchHistory", getMatchHistory);

router.get("/getRankInfo", getRankInfo)

export default router;

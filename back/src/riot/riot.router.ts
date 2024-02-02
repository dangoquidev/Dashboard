import express from "express";

import { getMatchHistory } from "./riot.controller";

const router = express.Router();

router.get("/getAccount", getMatchHistory);

export default router;

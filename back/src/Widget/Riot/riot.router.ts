import express from "express";

import { getAccountByInGameName } from "./riot.controller";

const router = express.Router();

router.get("/getAccount", getAccountByInGameName);

export default router;

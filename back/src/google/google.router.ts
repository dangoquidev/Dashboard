import express from "express";

import { connect, searchYoutube } from "./google.controller";
import { authenticateToken } from "../middlewares/auth";

const router = express.Router();

router.post("/connect", connect);

router.post("/searchYoutube", authenticateToken, searchYoutube);

export default router;

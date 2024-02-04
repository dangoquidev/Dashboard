import express from "express";

import { current } from "./weather.controller";
import { authenticateToken } from "../middlewares/auth";

const router = express.Router();

router.post("/current", authenticateToken, current);

export default router;

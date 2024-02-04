import express from "express";

import { getWidgetList } from "./data.controller";
import { authenticateToken } from "../middlewares/auth";

const router = express.Router();

router.get("/getWidgetList", authenticateToken, getWidgetList);

export default router;

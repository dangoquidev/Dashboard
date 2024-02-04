import express from "express";

import { getWidgetList } from "./data.controller";

const router = express.Router();

router.get("/getWidgetList", getWidgetList);

export default router;

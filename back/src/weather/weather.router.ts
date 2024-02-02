import express from "express";

import { current } from "./weather.controller";

const router = express.Router();

router.get("/current", current);

export default router;

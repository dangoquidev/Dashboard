import express from "express";

import { connect, searchYoutube } from "./google.controller";

const router = express.Router();

router.post("/connect", connect);

router.get("/searchYoutube", searchYoutube);

export default router;

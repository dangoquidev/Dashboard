import express from "express";

import { connect } from "./google.controller";

const router = express.Router();

router.post("/connect", connect);

export default router;

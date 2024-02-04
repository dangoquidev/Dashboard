import express from "express";

import { connect, getSpotifyPlaylist } from "./spotify.controller";
import { authenticateToken } from "../middlewares/auth";

const router = express.Router();

router.post("/connect", connect);

router.post("/getPlaylist", authenticateToken, getSpotifyPlaylist);

export default router;

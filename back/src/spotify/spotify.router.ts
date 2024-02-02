import express from "express";

import { connect, getSpotifyPlaylist } from "./spotify.controller";

const router = express.Router();

router.post("/connect", connect);

router.get("/getPlaylist", getSpotifyPlaylist);

export default router;

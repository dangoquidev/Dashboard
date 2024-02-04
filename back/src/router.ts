import express from "express";

import authRoutes from "./auth/auth.router";
import userRoutes from "./user/user.router";
import googleRoutes from "./google/google.router";
import riotRoutes from "./riot/riot.router";
import spotifyRoutes from "./spotify/spotify.router";
import weatherRoutes from "./weather/weather.router";
import animeRoutes from "./anime/anime.router";
import dataRoutes from "./data/data.router";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

router.use("/google", googleRoutes);

router.use("/riot", riotRoutes);

router.use("/spotify", spotifyRoutes);

router.use("/weather", weatherRoutes);

router.use("/anime", animeRoutes);

router.use("/data", dataRoutes);

export default router;

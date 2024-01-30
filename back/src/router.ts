import express from "express";

import authRoutes from "./auth/auth.router";
import userRoutes from "./user/user.router";
import googleRoutes from "./google/google.router";
import riotRoutes from "./Widget/Riot/riot.router";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

router.use("/google", googleRoutes);

router.use("/riot", riotRoutes);

export default router;

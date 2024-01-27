import express from "express";

import authRoutes from "./auth/auth.router";
import userRoutes from "./user/user.router";
import googleRoutes from "./google/google.router";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

router.use("/google", googleRoutes);

export default router;

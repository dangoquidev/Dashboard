import express from "express";

import { getAllUsers, deleteUser, updateUsername } from "./user.controller";
import { authenticateToken } from "../middlewares/auth";

const router = express.Router();

router.get("/", authenticateToken, getAllUsers);

router.delete("/:id", deleteUser);

router.post("/username", authenticateToken, updateUsername);

export default router;

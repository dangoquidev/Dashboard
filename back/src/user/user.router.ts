import express from "express";

import {
	getAllUsers,
	deleteUser,
	updateUsername,
	updateWidgetList,
	getWidgetList,
	getPfp,
} from "./user.controller";
import { authenticateToken } from "../middlewares/auth";

const router = express.Router();

router.get("/", authenticateToken, getAllUsers);

router.delete("/:id", authenticateToken, deleteUser);

router.post("/username", authenticateToken, updateUsername);

router.post("/updateWidgets", authenticateToken, updateWidgetList);

router.get("/widgets", authenticateToken, getWidgetList);

router.get("/pfp", authenticateToken, getPfp);

export default router;

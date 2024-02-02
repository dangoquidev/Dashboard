import express from "express";

import { searchAnime } from "./anime.controller";

const router = express.Router();

router.get("/search", searchAnime);

export default router;

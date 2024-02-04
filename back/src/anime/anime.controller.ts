import express from "express";
import { getAnime } from "./anime.services";

export const searchAnime = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { title } = req.body;

		const anime = await getAnime(title);

		if (anime === null) {
			return res
				.status(404)
				.json({ success: false, message: "Anime not found" });
		}

		return res.status(200).json({
			success: true,
			message: "Anime fetched successfully",
			anime,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, message: "Get current anime failed" });
	}
};

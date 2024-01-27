import express from "express";
import { createUserWithGoogleToken, getGoogleToken } from "./google.services";

export const connect = async (req: express.Request, res: express.Response) => {
	try {
		const { code, redirect_uri } = req.body;

		const tokens = await getGoogleToken(code, redirect_uri);

		createUserWithGoogleToken(tokens.id_token);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, message: "Google oauth2 login failed" });
	}
};

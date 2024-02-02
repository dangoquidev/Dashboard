import express from "express";
import { createUserWithGoogleToken, getGoogleToken } from "./google.services";

export const connect = async (req: express.Request, res: express.Response) => {
	try {
		const { code, redirect_uri } = req.body;


		const tokens = await getGoogleToken(code, redirect_uri);

		const user = await createUserWithGoogleToken(tokens.id_token);

		if (!user.success) {
			return res
				.status(500)
				.json({ success: false, message: user.message });
		}

		return res
			.status(200)
			.json({ success: true, message: "Google oauth2 login successfuly", sessionToken: user.sessions_token, apiToken: tokens.access_token });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, message: "Google oauth2 login failed" });
	}
};

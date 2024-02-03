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

import axios from 'axios';

export const searchYoutube = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { channelName, type, token } = req.body;
		const apiKey = process.env.YOUTUBE_API_KEY;

		if (type === 'channelStats') {
			const searchResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelName}&key=${apiKey}`);
			const channelId = searchResponse.data.items[0].id.channelId;
			const channelResponse = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`);
			const channelStats = channelResponse.data.items[0].statistics;
			const profilePicture = channelResponse.data.items[0].snippet.thumbnails.default.url;
			return res.status(200).json({ success: true, message: "Channel stats fetched successfully", channelStats, profilePicture });
		} else if (type === 'userStats') {
			const accessToken = token;
			const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&mine=true&access_token=${accessToken}`);
			const userStats = response.data.items[0].statistics;
			const profilePicture = response.data.items[0].snippet.thumbnails.default.url;
			return res.status(200).json({ success: true, message: "User stats fetched successfully", userStats, profilePicture });
		} else {
			return res.status(400).json({ success: false, message: "Invalid request type" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, message: "YouTube search failed" });
	}
};

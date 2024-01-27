import axios from "axios";
import express from "express";
import { decode } from "jsonwebtoken";

export const getGoogleToken = async (code: string, redirect_uri: string) => {
	const tokenEndpoint = "https://oauth2.googleapis.com/token";
	const client_id = process.env.REACT_APP_GOOGLE_CLI;
	const client_secret = process.env.GOOGLE_SECRET;
	let tokenResponse = null;
	try {
		tokenResponse = await axios.post(tokenEndpoint, {
			code,
			redirect_uri,
			client_id,
			client_secret,
			grant_type: "authorization_code",
		});
	} catch (error) {
		console.error(error);
		return null;
	}
	return {
		access_token: tokenResponse.data.access_token,
		id_token: tokenResponse.data.id_token,
	};
};

export const createUserWithGoogleToken = async (id_token: string) => {
	const decodedToken = decode(id_token) as { [key: string]: any };
	console.log(decodedToken);
};

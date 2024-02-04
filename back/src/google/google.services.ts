import axios from "axios";
import express from "express";
import { decode } from "jsonwebtoken";
import { generateRandomPassword, random, authentification } from "../helpers";
import { getUsersByEmail, createUser } from "../db/users";

export const getGoogleToken = async (code: string, redirect_uri: string) => {
	const tokenEndpoint = "https://oauth2.googleapis.com/token";
	const client_id = process.env.VITE_GOOGLE_CLI;
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

	if (decodedToken) {
		const email = decodedToken.email;
		const username = decodedToken.name;
		const pass = generateRandomPassword(12);
		const pfp = decodedToken.picture;

		let user = await getUsersByEmail(email);
		let salt = random();

		if (!user) {
			user = await createUser({
				email,
				username,
				profilePicture: pfp,
				authentification: {
					salt,
					password: authentification(salt, pass),
				},
			});
		}

		user.authentification.sessionToken = authentification(
			salt,
			user._id.toString()
		);

		try {
			await user.save();
		} catch (error) {
			console.error(error);
			return {
				success: false,
				message: "Failed to save session token",
			};
		}

		return {
			success: true,
			message: "Google oauth2 login successfuly",
			sessions_token: user.authentification.sessionToken,
		};
	} else {
		return {
			success: false,
			message: "Google oauth2 login failed",
		};
	}
};

import axios from "axios";
import express from "express";
import { decode } from "jsonwebtoken";
import { generateRandomPassword, random, authentification } from "../helpers";
import { getUsersByEmail, createUser } from "../db/users"

export const getSpotifyToken = async (code: string, redirect_uri: string) => {
	const tokenEndpoint = "https://accounts.spotify.com/api/token";
	const client_id = process.env.VITE_SPOTIFY_CLI;
	const client_secret = process.env.SPOTIFY_SECRET;
	let tokenResponse = null;

	try {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
		tokenResponse = await axios.post(tokenEndpoint, {
			code,
			redirect_uri,
			client_id,
			client_secret,
			grant_type: "authorization_code",
		}, {headers});
	} catch (error) {
		console.error(error);
		return null;
	}
	return {
		access_token: tokenResponse.data.access_token,
	};
};

const getInfoFromSpotify = async (token: string) => {
    const spotifyEndpoint = "https://api.spotify.com/v1/me";
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await axios.get(spotifyEndpoint, { headers });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const createUserWithSpotifyToken = async (id_token: string) => {
	const profile = await getInfoFromSpotify(id_token);
	
	if (profile) {
		const email = profile.email;
		const username = profile.display_name;
		const pass = generateRandomPassword(12);
		const pfp = profile.images[0].url;

		let user = await getUsersByEmail(email);
		let salt = random();

		if (!user ) {
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
			message: "Spotify oauth2 login successfuly",
			sessions_token: user.authentification.sessionToken,
		};
	} else {
		return {
			success: false,
			message: "Spotify oauth2 login failed",
		};
	}
};


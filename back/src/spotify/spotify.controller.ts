import express from "express";
import { createUserWithSpotifyToken, getSpotifyToken } from "./spotify.services";
import { getUserPlaylists, getPlaylistTracks } from "./spotify.services";

export const connect = async (req: express.Request, res: express.Response) => {
	try {
		const { code, redirect_uri } = req.body;

		const tokens = await getSpotifyToken(code, redirect_uri);

        console.log(tokens);

		const user = await createUserWithSpotifyToken(tokens.access_token);

		if (!user.success) {
			return res
				.status(500)
				.json({ success: false, message: user.message });
		}

		return res
			.status(200)
			.json({ success: true, message: "Spotify oauth2 login successfuly", sessionToken: user.sessions_token, apiToken: tokens.access_token });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, message: "Spotify oauth2 login failed" });
	}
};

export const getSpotifyPlaylist = async (req: express.Request, res: express.Response) => {
    try {
        const { accessToken } = req.body;

        const playlists = await getUserPlaylists(accessToken);
        const playlistsWithTracks = [];

        for (let playlist of playlists) {
            const tracks = await getPlaylistTracks(accessToken, playlist.id);
            playlistsWithTracks.push({
                ...playlist,
                tracks: tracks,
            });
        }

        return res
            .status(200)
            .json({ success: true, message: "Playlists fetched successfully", playlists: playlistsWithTracks });

    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Get Spotify playlists failed" });
    }
}
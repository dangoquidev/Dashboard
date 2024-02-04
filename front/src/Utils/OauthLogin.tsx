export const googleLogin = () => {
	const client_id = import.meta.env.VITE_GOOGLE_CLI;
	const redirectUrl = `${window.location.origin}/loading?provider=google`;

	const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&redirect_uri=${encodeURIComponent(
		redirectUrl
	)}&client_id=${client_id}&scope=openid%20profile%20email&access_type=offline`;

	window.location.href = googleAuthUrl;
};

export const spotifyLogin = () => {
	const client_id = import.meta.env.VITE_SPOTIFY_CLI;
	const redirectUrl = `${window.location.origin}/loading?provider=spotify`;
	const scope =
		"user-read-private user-read-email user-library-read streaming";

	const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(
		scope
	)}&redirect_uri=${encodeURIComponent(redirectUrl)}&show_dialog=true`;

	window.location.href = spotifyAuthUrl;
};

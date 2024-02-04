import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentification = (salt: string, password: string) => {
	return crypto
		.createHmac("sha256", [salt, password].join("/"))
		.update(process.env.SECRET)
		.digest("hex");
};

export const generateRandomPassword = (length: number) => {
	const buffer = crypto.randomBytes(length);
	const password = buffer.toString("base64").slice(0, length);
	return password;
};

export const widgetList = [
	{
		id: 0,
		title: "Anime Search",
		url: "/anime/search",
		placeholder: "Enter anime title",
	},
	{
		id: 1,
		title: "Weather",
		url: "/weather/current",
		placeholder: "Enter city name",
	},
	{
		id: 2,
		title: "League Profile",
		url: ["/riot/getRankInfo", "/riot/getMatchHistory"],
		placeholder: "Enter riot tag",
	},
	{
		id: 3,
		title: "Youtube",
		url: "/google/searchYoutube",
		placeholder: "Enter channel name",
	},
	{
		id: 4,
		title: "Spotify",
		url: "/spotify/getPlaylist",
	},
];

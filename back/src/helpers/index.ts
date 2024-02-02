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
	"Weather",
	"Anime Search",
	"League Profile",
	"YoutubeInfo",
	"Spotify",
];

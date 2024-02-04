import Request from "../../Libs/request";
import {
	WeatherProps,
	SpotifyProps,
	LeagueProps,
	AnimeProps,
	YoutubeProps,
} from "./types";

export const getWidgetList = async () => {
	return Request()
		.get("/data/getWidgetList")
		.then((response) => response.data);
};

export const callWidget = async (
	url: string,
	data: WeatherProps | SpotifyProps | LeagueProps | AnimeProps | YoutubeProps
) => {
	return Request()
		.post(url, data)
		.then((response) => response.data);
};

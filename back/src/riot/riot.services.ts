import axios from "axios";
import dotenv from "dotenv";
import { MatchInfo } from "./riot.type";
import moment from "moment";

dotenv.config();

const headers = {
	"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
	Origin: "https://developer.riotgames.com",
	"X-Riot-Token": process.env.LEAGUE_API,
};

export const getPuuidFromInGameName = async (
	GameName: string,
	TagLine: string
) => {
	const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${GameName}/${TagLine}`;

	try {
		const response = await axios.get(url, { headers });
		return response.data;
	} catch (error) {
		console.error("Error occurred while making API call:", error);
		throw error;
	}
};

export const getInfoFromPuuid = async (puuid: string, region: string) => {
	const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;

	try {
		const response = await axios.get(url, { headers });
		return response.data;
	} catch (error) {
		console.error("Error occurred while making API call:", error);
		throw error;
	}
};

export const getFiveLastGame = async (puuid: string, region: string) => {
	const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`;

	try {
		const response = await axios.get(url, { headers });
		return response.data;
	} catch (error) {
		console.error("Error occurred while making API call:");
		throw error;
	}
};

const getTimePlayed = (seconds: number) => {
	const duration = moment.duration(seconds, "seconds");
	const formattedDuration = moment
		.utc(duration.asMilliseconds())
		.format("mm:ss");
	return formattedDuration || "00:00";
};

export const getMatchInfoFromResponse = async (
	response: any,
	puuid: string
): Promise<MatchInfo> => {
	const summoner = response.info.participants.find(
		(participant: any) => participant.puuid === puuid
	);
	const gameDuration = getTimePlayed(response.info.gameDuration);
	const isWin = summoner.win;
	const gameMode = response.info.gameMode;
	const gameEndTime = moment(response.info.gameEndTimestamp).fromNow();
	const champion = summoner.championName;
	const championImage = `https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/${champion}.png`;
	const kda = `${summoner.kills}/${summoner.deaths}/${summoner.assists}`;
	const cs = summoner.totalMinionsKilled + summoner.neutralMinionsKilled;

	return {
		gameDuration,
		isWin,
		gameMode,
		gameEndTime,
		champion,
		championImage,
		kda,
		cs,
	};
};

export const getMatch = async (matchId: string, region: string) => {
	const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`;

	try {
		const response = await axios.get(url, { headers });
		return response.data;
	} catch (error) {
		console.error("Error occurred while making API call:", error);
		throw error;
	}
};

export const getAccountInfo = async (playerId: string, region: string) => {
	const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${playerId}`;

	try {
		const response = await axios.get(url, { headers });
		const lenght = response.data.length;
		if (lenght === 0) {
			return {
				rank: "Unranked",
				tier: "Unranked",
				leaguePoints: 0,
				wins: 0,
				losses: 0,
				wr: 0,
			};
		}
		const rank = response.data[lenght - 1].rank;
		const tier = response.data[lenght - 1].tier;
		const leaguePoints = response.data[lenght - 1].leaguePoints;
		const wins = response.data[lenght - 1].wins;
		const losses = response.data[lenght - 1].losses;
		const wr = ((wins / (wins + losses)) * 100).toFixed(2);
		return { rank, tier, leaguePoints, wins, losses, wr };
	} catch (error) {
		console.error("Error occurred while making API call:", error);
		throw error;
	}
};

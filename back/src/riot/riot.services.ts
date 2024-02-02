import axios from "axios";
import dotenv from "dotenv";
import { MatchInfo } from "./riot.type";
import moment from "moment";

dotenv.config();

const headers = {
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://developer.riotgames.com",
    "X-Riot-Token": process.env.LEAGUE_API,
};

export const getPuuidFromInGameName = async (GameName: string, TagLine: string) => {
    const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${GameName}/${TagLine}`;

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error("Error occurred while making API call:", error);
        throw error;
    }
}

export const getInfoFromPuuid = async (puuid: string, region: string) => {
    const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error("Error occurred while making API call:", error);
        throw error;
    }
}

export const getFiveLastGame = async (puuid: string, region: string) => {
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`;

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error("Error occurred while making API call:");
        throw error;
    }
}

const getTimePlayed = (seconds: number) => {
	const duration = moment.duration(seconds, "seconds");
	const formattedDuration = moment
		.utc(duration.asMilliseconds())
		.format("mm:ss");
	return formattedDuration || "00:00";
};

export const getMatchInfoFromResponse = async (response: any, puuid: string): Promise<MatchInfo> => {
    const itemData = await axios.get(`https://ddragon.leagueoflegends.com/cdn/14.2.1/data/en_US/item.json`);
    const summoner = response.info.participants.find((participant: any) => participant.puuid === puuid);
    const { item0, item1, item2, item3, item4, item5, item6 } = summoner;
	const itemsArray = [item0, item1, item2, item3, item4, item5, item6];
    const itemsNameArray = ["item0", "item1", "item2", "item3", "item4", "item5", "item6"];
    const gameDuration = getTimePlayed(response.info.gameDuration);
    const isWin = summoner.win;
    const gameMode = response.info.gameMode;
    const gameEndTime = moment(response.info.gameEndTimestamp).fromNow();
    const champion = summoner.championName;
    const championImage = `http://ddragon.leagueoflegends.com/cdn/${response.info.gameVersion}/img/champion/${summoner.championName}.png`;
    const kda = `${summoner.kills}/${summoner.deaths}/${summoner.assists}`;
    const cs = summoner.totalMinionsKilled + summoner.neutralMinionsKilled;
    itemsArray.map((item, index) => {
        if (item !== 0) {
            itemsArray[index] = `http://ddragon.leagueoflegends.com/cdn/${response.info.gameVersion}/img/item/${item}.png`;
            itemsNameArray[index] = itemData.data.data[item].name;
        }
    })

    console.log(gameDuration, isWin, gameMode, gameEndTime, champion, championImage, kda, cs, itemsArray, itemsNameArray);

    return { gameDuration, isWin, gameMode, gameEndTime, champion, championImage, kda, cs, itemsArray, itemsNameArray };
}

export const getMatch = async (matchId: string, region: string) => {
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`;

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error("Error occurred while making API call:", error);
        throw error;
    }
}

export const getAccountInfo = async ( playerId: string, region: string ) => {
    const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${playerId}`;

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error("Error occurred while making API call:", error);
        throw error;
    }
}
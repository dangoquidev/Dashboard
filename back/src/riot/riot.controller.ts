import express from "express";
import {
	getPuuidFromInGameName,
	getInfoFromPuuid,
	getFiveLastGame,
	getMatch,
	getMatchInfoFromResponse,
} from "./riot.services";
import { MatchInfo } from "./riot.type";

export const getMatchHistory = async (
	req: express.Request,
	res: express.Response
) => {
	const { IGN, region } = req.body;
	const [GameName, TagLine] = IGN.split("#");
	const matchHistoryInfo: MatchInfo[] = [];
	try {
	const account = await getPuuidFromInGameName(GameName, TagLine);

		if (!account) {
			return res
				.status(404)
				.json({ success: false, message: "Account not found" });
		}

		const info = await getInfoFromPuuid(account.puuid, region);

		if (!info) {
			return res
				.status(404)
				.json({ success: false, message: "Account not found" });
		}

		const games = await getFiveLastGame(account.puuid, region);

		if (!games) {
			return res
				.status(404)
				.json({ success: false, message: "Games not found" });
		}

		games.map(async (matchId: string) => {
			const data = await getMatch(matchId, region);
			matchHistoryInfo.push(
				await getMatchInfoFromResponse(data, account.puuid)
			);
		});

		return res
			.status(200)
			.json({ success: true, message: "Games fetched successfully", matchHistoryInfo });
			
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, message: "Get match history failed" });
	}
};


export const getAccountInfo = async ( req : express.Request, res : express.Response ) => {
	const { IGN, region } = req.body;
	const [GameName, TagLine] = IGN.split("#");
	try {
	const account = await getPuuidFromInGameName(GameName, TagLine);

		if (!account) {
			return res
				.status(404)
				.json({ success: false, message: "Account not found" });
		}

		const info = await getInfoFromPuuid(account.puuid, region);

		if (!info) {
			return res
				.status(404)
				.json({ success: false, message: "Account not found" });
		}

		

		return res
			.status(200)
			.json({ success: true, message: "Games fetched successfully" });
			
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, message: "Get match history failed" });
	}
}
import express from "express";
import {
	getPuuidFromInGameName,
	getInfoFromPuuid,
	getFiveLastGame,
	getMatch,
	getMatchInfoFromResponse,
} from "./riot.services";
import { MatchInfo } from "./riot.type";

export const getAccountByInGameName = async (
	req: express.Request,
	res: express.Response
) => {
	const { IGN, region } = req.body;
	const [GameName, TagLine] = IGN.split("#");
	const matchHistoryInfo: MatchInfo[] = [];
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
		.json({ success: true, account, info, matchHistoryInfo });
};

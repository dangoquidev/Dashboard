import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const authenticateToken = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const authHeader = req.headers.authorization;
		const sessionToken = authHeader && authHeader.split(" ")[1];

		if (!sessionToken) {
			return res.status(401).send("Un-Authorized");
		}

		const userFetched = await getUserBySessionToken(sessionToken);

		if (!userFetched) {
			return res.status(401).send("Un-Authorized");
		}

		const user: UserType = {
			id: userFetched._id.toString(),
			username: userFetched.username,
			email: userFetched.email,
		};

		req.user = user;

		return next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return res.status(401).send(error.name);
		}
		return res.status(401).send("Un-Authorized");
	}
};

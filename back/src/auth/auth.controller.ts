import express from "express";

import { getUsersByEmail, createUser } from "../db/users";
import { random, authentification } from "../helpers/index";

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password, username } = req.body;

		if (!email || !password || !username) {
			return res.status(400).json({
				success: false,
				message: "Missing required fields",
			});
		}

		const existingUser = await getUsersByEmail(email);

		if (existingUser) {
			return res
				.status(400)
				.json({ success: false, message: "User already exists" });
		}
		const salt = random();
		const user = await createUser({
			email,
			username,
			authentification: {
				salt,
				password: authentification(salt, password),
			},
		});

		return res
			.status(200)
			.json({ success: true, message: "User created successfully" })
			.end();
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "Register failed", error });
	}
};

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Missing required fields",
			});
		}

		const user = await getUsersByEmail(email).select(
			"+authentification.salt +authentification.password"
		);

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		const expectedHash = authentification(
			user.authentification.salt,
			password
		);

		if (user.authentification.password !== expectedHash) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid password" });
		}

		const salt = random();

		user.authentification.sessionToken = authentification(
			salt,
			user._id.toString()
		);

		await user.save();

		return res
			.status(200)
			.json({ success: true, message: "User logged in", data: user.authentification.sessionToken })
			.end();
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "Login failed", error });
	}
};

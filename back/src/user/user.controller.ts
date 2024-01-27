import express from "express";

import { getUsers, deleteUserById, updateUserById } from "../db/users";

export const getAllUsers = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const users = await getUsers();
		return res.status(200).json({
			success: true,
			message: "All users fetched successfully",
			data: users,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send("Get all user failed");
	}
};

export const deleteUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const userId = req.params.id;

		const deletedUser = await deleteUserById(userId);

		return res.status(200).json({
			success: true,
			message: `User "${userId}" deleted successfully`,
			data: deletedUser,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send("Delete user failed");
	}
};

export const updateUsername = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const userId = req.user.id;
		const { username } = req.body;
		await updateUserById(userId, {
			username,
		});

		return res.status(200).json({
			success: true,
			message: `Username updated to ${username} successfuly`,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send("Update user failed");
	}
};

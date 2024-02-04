import express from "express";
import {
	getUsers,
	deleteUserById,
	updateUserById,
	getUserWidgets,
	getUserPfp,
} from "../db/users";

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

export const updateWidgetList = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const userId = req.user.id;
		const widgets = req.body;

		await updateUserById(userId, { widgets });

		return res.status(200).send({
			success: true,
			message: "Widget list updated successfully",
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.send({ success: false, message: "Update widget list failed" });
	}
};

export const getWidgetList = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const userId = req.user.id;

		const widgets = await getUserWidgets(userId);

		return res.status(200).json({
			success: true,
			message: `Widgets fetched successfully for user "${userId}"`,
			data: widgets,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send("Get user widgets failed");
	}
};

export const getPfp = async (req: express.Request, res: express.Response) => {
	try {
		const userId = req.user.id;

		const pfp = await getUserPfp(userId);

		if (!pfp) {
			return res
				.status(404)
				.send({ success: false, message: "User pfp not found" });
		}
		return res.status(200).send({
			success: true,
			message: "User pfp fetched successfully",
			data: pfp,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send("Get user pfp failed");
	}
};

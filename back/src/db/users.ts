import mongoose, { Schema } from "mongoose";
import Widgets from "./type";

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	authentification: {
		password: { type: String, required: true, select: false },
		salt: { type: String, select: false },
		sessionToken: { type: String, select: false },
	},
	profilePicture: { type: String, required: false },
	widgets: [
		{
			id: Number,
			title: String,
			type: String,
			data: Schema.Types.Mixed,
		},
	],
});

export const userModel = mongoose.model("User", userSchema);

export const getUsers = () => userModel.find({});
export const getUsersByEmail = (email: string) => userModel.findOne({ email });
export const getUserBySessionToken = (token: string) =>
	userModel.findOne({ "authentification.sessionToken": token });
export const getUserById = (id: string) => userModel.findById(id);
export const createUser = (values: Record<string, any>) =>
	new userModel(values).save();
export const deleteUserById = (id: string) => userModel.findByIdAndDelete(id);
export const updateUserById = (id: string, values: Record<string, any>) =>
	userModel.findByIdAndUpdate(id, values);

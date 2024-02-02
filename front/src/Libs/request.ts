import axios, { AxiosInstance } from "axios";
import { API_URL } from "../config";
import { readFromCookies } from "./cookies";

const createAxiosInstance = (): AxiosInstance => {
	const accessToken = readFromCookies("accessToken");
	let reqHeaders: { [key: string]: string } = {
		Authorization: `Bearer ${accessToken}`,
	};

	const axiosInstance = axios.create({
		baseURL: API_URL,
		headers: reqHeaders,
	});

	axiosInstance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response) {
				return Promise.resolve(error.response);
			}
			return Promise.reject(error);
		}
	);

	return axiosInstance;
};

const Request = (): AxiosInstance => {
	return createAxiosInstance();
};

export default Request;

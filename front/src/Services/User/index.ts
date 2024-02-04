import Request from "../../Libs/request";

export const updateUserWidgetList = async (widgetsList: Array<any>) => {
	return Request()
		.post("/user/updateWidgets", widgetsList)
		.then((response) => response.data);
};

export const getUserWidgetList = async () => {
	return Request()
		.get("/user/widgets")
		.then((response) => response.data);
};

export const getUserPfp = async () => {
	return Request()
		.get("/user/pfp")
		.then((response) => response.data);
};

import Request from "../../Libs/request";

export const getWidgetList = async () => {
    return Request()
        .get("/data/getWidgetList")
        .then((response) => response.data);
}
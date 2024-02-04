import express from "express";
import { widgetList } from "../helpers";

export const getWidgetList = async (req: express.Request, res: express.Response) => {
    return res
        .status(200)
        .json({ success: true, message: "Widget list fetched successfully", widgetList });
}
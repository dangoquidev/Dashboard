import express from "express";
import { getWeather } from "./weather.services";

export const current = async (
    req: express.Request,
    res: express.Response
) => {
    try  {
        const { city } = req.body;

        const weather = await getWeather(city);

        if (!weather) {
            return res
                .status(404)
                .json({ success: false, message: "City not found" });
        }

        return res
            .status(200)
            .json({ success: true, message: "Weather fetched successfully", weather });

    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Get current weather failed" });
    }
}
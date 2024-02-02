import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getWeather = async (city: string) => {
    try  {
        const weather_api = process.env.WEATHER_API_KEY;
        const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${weather_api}`;

        const response = await axios.get(url);
        const data = response.data;
        const weather = {
            city: data.location.name,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            icon: `https:${data.current.condition.icon}`,
            windSpeed: data.current.wind_kph,
            humidity: data.current.humidity,
        };

        return weather;
    } catch (error) {
        console.error(error);
        return null;
    }
}


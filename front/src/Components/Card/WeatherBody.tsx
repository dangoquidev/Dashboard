import { Image} from "@nextui-org/react";
import { WeatherBodyProps } from "./types";

export const WeatherBody = ({ size, city, icon, temp, precip, humidity, wind }: WeatherBodyProps) => {
	return (
		<div className='flex flex-col'>
			<h2 className='text-center text-2xl mb-4'>{city}</h2>
			<div className={`${
				size === "small" ? "flex flex-col items-center" : "flex flex-row justify-between w-full items-center"
			} gap-4`}>
                <Image
					alt='Cloud image'
					className='object-cover rounded-xl'
					src={icon}
					width="100"
				/>
                <span>{temp}°C</span>
                <div className="flex flex-col gap-2">
                    <span>Precip: {precip}%</span>
                    <span>Humidity: {humidity}%</span>
                    <span>Wind: {wind}km/h</span>
                </div>
			</div>
		</div>
	);
};

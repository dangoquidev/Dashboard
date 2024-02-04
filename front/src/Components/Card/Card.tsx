import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa6";
import styles from "./Card.module.css";
import { CardWidgetProps } from "./types";
import { WeatherBody } from "./WeatherBody";
import { AnimeBody } from "./AnimeBody";
import { LeagueBody } from "./LeagueBody";
import { SpotifyBody } from "./SpotifyBody";
import { YoutubeBody } from "./YoutubeBody";

export const CardWidget = ({
	size,
	id,
	data,
	onDelete,
	onEdit,
}: CardWidgetProps) => {
	return (
		<Card className={`py-4 ${styles[size]}`}>
			<div className='flex flex-row'>
				<Button
					size='lg'
					variant='light'
					isIconOnly
					style={{ top: 0, right: 0 }}
					onClick={onEdit}>
					<FaPen />
				</Button>
				<Button
					size='lg'
					variant='light'
					isIconOnly
					style={{ top: 0, right: 0, marginLeft: "auto" }}
					onClick={onDelete}>
					<FaTrash />
				</Button>
			</div>
			<CardBody className='overflow-visible py-2 gap-4'>
				{id == 0 ? (
					<AnimeBody
						size={size}
						title={data.title}
						description={data.description}
						image={data.image_url}
						rating={data.rating}
						year={data.year}
						episode={data.episodes}
					/>
				) : id == 1 ? (
					<WeatherBody
						size={size}
						city={data.city}
						icon={data.icon}
						temp={data.temperature}
						precip={data.precipitation}
						humidity={data.humidity}
						wind={data.windSpeed}
					/>
				) : id == 2 ? (
					<LeagueBody
						size={size}
						rankInfo={data[0]}
						games={data[1]}
						name={data.name}
					/>
				) : id == 3 ? (
					<YoutubeBody
						size={size}
						name={data[2]}
						profilePicture={data[1]}
						subscribers={data[0].subscriberCount}
						views={data[0].viewCount}
						videos={data[0].videoCount}
					/>
				) : (
					<SpotifyBody size={size} playlists={data} />
				)}
			</CardBody>
		</Card>
	);
};

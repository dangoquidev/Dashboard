import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import styles from "./Card.module.css";
import { CardWidgetProps } from "./types";
import { WeatherBody } from "./WeatherBody";
import { AnimeBody } from "./AnimeBody";
import { LeagueBody } from "./LeagueBody";

export const CardWidget = ({ size }: CardWidgetProps) => {
	return (
		<Card className={`py-4 ${styles[size]}`}>
			<CardHeader className='pb-0 pt-2 px-4 flex-col items-center'>
				<h4 className='font-bold text-large'>NAGISA BEST WAIFU</h4>
			</CardHeader>
			<CardBody className='overflow-visible py-2 gap-4'>
				<LeagueBody 
					size={size} 
					name="Dango#koron"
					rank={{rank: "III", tier: "Diamond", leaguePoints: 5, wins: 4, losses: 1, wr: "80.00"}}
					games={[{duration: "10:00", isWin: true, gameMode: "ARAM", gameEndTime: "10:00", championIcon: "https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Teemo.png", kda: "5/5", cs: 10}]}
					/>
			</CardBody>
		</Card>
	);
};

import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { LeagueBodyProps } from "./types";
import { Image, Button } from "@nextui-org/react";
import useEmblaCarousel from 'embla-carousel-react';
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import "./Carrousel.css"

Chart.register(ArcElement);

const GameHistory = ({ games, size }: { games: any[], size: "small" | "medium" | "large" }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

    const scrollPrev = () => {
        if (emblaApi) {
            emblaApi.scrollPrev();
        }
    };

    const scrollNext = () => {
        if (emblaApi) {
            emblaApi.scrollNext();
        }
    };

    let slideSize: string;
    if (size === 'small') {
        slideSize = '65%';
    } else if (size === 'medium') {
        slideSize = '28%';
    } else if (size === 'large') {
        slideSize = '18%';
    }

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
            {games.map((game, index) => (
                <div key={index} className="embla__slide" style={{ flex: `0 0 ${slideSize}` }}>
                    <div className="flex flex-col items-center text-center">
                        <Image
                            alt='Champion icon'
                            className='object-cover rounded-lg'
                            src={game.championIcon}
                            width="100"
                        />
                        <div className="flex flex-col items-center text-center mt-2">
                            <span>{game.kda}</span>
                            <span>{game.cs} CS</span>
                            <span>{game.duration}</span>
                            <span>{game.gameEndTime}</span>
                        </div>
                    </div>
                </div>
            ))}
                </div>
            </div>
            
            <Button variant="light" onClick={scrollPrev} isIconOnly className="absolute left-0 top-1/2"><BiSolidLeftArrow /></Button>
            <Button variant="light" onClick={scrollNext} isIconOnly className="absolute right-0 top-1/2"><BiSolidRightArrow /></Button>
        </div>
    );
};


const RankInfo = ({ size, rankInfo, name }: LeagueBodyProps) => {
    const data = {
        labels: [`Wins: ${rankInfo.wins}`, `Losses: ${rankInfo.losses}`],
        datasets: [
            {
                data: [rankInfo.wins, rankInfo.losses],
                backgroundColor: ['blue', 'red'],
                borderWidth: 1,
                borderColor: ['#0000ff', '#ff0000'],
                hoverBackgroundColor: ['blue', 'red'],
                hoverBorderColor: ['#0000ff', '#ff0000'],
            },
        ],
    };

    return (
        <div className={`${size === "small" ? "flex flex-col items-center" : "flex flex-row justify-between w-full items-center"} gap-4`}>
            <Image
                alt='Cloud image'
                className='object-cover rounded-xl'
                src={`/${rankInfo.tier}.webp`}
                width={size === "small" ? "100" : "200"}
            />
            <div className="flex flex-col items-center gap-2">
                <span>{rankInfo.tier} {rankInfo.rank} {rankInfo.leaguePoints}lp</span>
                <div style={{ height: '100px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Doughnut data={data} />
                    <div>
                        <span>{rankInfo.wins} - {rankInfo.losses}</span>
                    </div>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <span>{rankInfo.wr}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export const LeagueBody = ({ size, rankInfo, games, name }: LeagueBodyProps) => {
    return (
        <div>
            <h2 className='text-center text-2xl mb-4'>{name}</h2>
            <RankInfo size={size} rankInfo={rankInfo} name={name} games={games} />
            <GameHistory games={games} size={size}/>
        </div>
    );
};

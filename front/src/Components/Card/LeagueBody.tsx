import * as React from "react";
import { Image, ScrollShadow } from "@nextui-org/react";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { LeagueBodyProps } from "./types";
import useEmblaCarousel from 'embla-carousel-react';

Chart.register(ArcElement);

export const LeagueBody = ({ size, rank, games, name }: LeagueBodyProps) => {
    const data = {
        labels: ['Wins', 'Losses'],
        datasets: [
            {
                data: [rank.wins, rank.losses],
                backgroundColor: ['blue', 'red'],
                borderWidth: 1,
                borderColor: ['#0000ff', '#ff0000'],
                hoverBackgroundColor: ['blue', 'red'],
                hoverBorderColor: ['#0000ff', '#ff0000'],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        cutout: '90%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    const [EmblaCarousel, embla] = useEmblaCarousel({ loop: true });

    return (
        <div className='flex flex-col'>
            <h2 className='text-center text-2xl mb-4'>{name}</h2>
            <EmblaCarousel>
                <div className={`${
                    size === "small" ? "flex flex-col items-center" : "flex flex-row justify-between w-full items-center"
                } gap-4`}>
                    <Image
                        alt='Cloud image'
                        className='object-cover rounded-xl'
                        src={`/${rank.tier}.webp`}
                        width={size === "small" ? "100" : "200"}
                    />
                    <div className="flex flex-col items-center gap-2">
                        <span>{rank.tier} {rank.rank} {rank.leaguePoints}lp</span>
                        <div style={{ height: '100px', position: 'relative' }}>
                            <Doughnut data={data} options={options} />
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <span>{rank.wr}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span>Win: {rank.wins}/5</span>
                        <span>Losses: {rank.losses}</span>
                    </div>
                </div>
                <div>
                    <h3>Match History</h3>
                </div>
                <div>
                    <h3>Test</h3>
                </div>
            </EmblaCarousel>
        </div>
    );
};

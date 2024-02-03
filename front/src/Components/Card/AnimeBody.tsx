import { Image, ScrollShadow } from "@nextui-org/react";
import { AnimeBodyProps } from "./types";

export const AnimeBody = ({ size, title, description, image, rating, year, episode }: AnimeBodyProps) => {
	return (
		<div className='flex flex-col'>
			<h2 className='text-center text-2xl mb-4'>{title}</h2>
			<div className={`${
				size === "small" ? "flex flex-col items-center" : "flex flex-row justify-between w-full items-center"
			} gap-4`}>
                <Image
					alt='Cloud image'
					className='object-cover rounded-xl'
					src={image}
					width={size === "small" ? "100" : "200"}
				/>

                    <ScrollShadow className="w-[300px] h-[200px]" hideScrollBar>
                        <span>{description}</span>
                    </ScrollShadow>
                <div className="flex flex-col gap-2">
                    <span>Rating: {rating}/5</span>
                    <span>Episodes: {episode}</span>
                    <span>Broadcast: {year}</span>
                </div>
			</div>
		</div>
	);
};

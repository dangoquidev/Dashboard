import * as React from "react";
import { Image } from "@nextui-org/react";
import { YoutubeBodyProps } from "./types";

export const YoutubeBody= ({ name, size, profilePicture, subscribers, views, videos }: YoutubeBodyProps) => {
    return (
		<div className='flex flex-col'>
			<h2 className='text-center text-2xl mb-4'>{name}</h2>
			<div className={`${
				size === "small" ? "flex flex-col items-center" : "flex flex-row justify-between w-full items-center"
			} gap-4`}>
                <Image
                    alt='Profile picture'
                    className='object-cover rounded-lg'
                    src={profilePicture}
                    width="100"
                />
                    <span>Subscribers: {subscribers}</span>
                    <span>Views: {views}</span>
                    <span>Videos: {videos}</span>
            </div>
        </div>
    );
};

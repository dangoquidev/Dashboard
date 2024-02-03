import * as React from "react";
import { Image, Button } from "@nextui-org/react";
import useEmblaCarousel from 'embla-carousel-react';
import "./Carrousel.css";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { SpotifyBodyProps } from "./types";
import { SpotifyWebPlayer } from "./SpotifyWebPlayer";

export const SpotifyBody = ({ playlists, size }: SpotifyBodyProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedPlaylist, setSelectedPlaylist] = React.useState(null);

    const handlePlaylistClick = (playlist: any) => {
        setSelectedPlaylist(playlist);
    };

    const handleBack = () => {
        console.log("Back button clicked");
        setSelectedPlaylist(null);
    };

    if (selectedPlaylist) {
        return <SpotifyWebPlayer playlist={selectedPlaylist} onBack={handleBack} />;
    }

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
                    {playlists.map((playlist, index) => (
                        <div key={index} className="embla__slide" style={{ flex: `0 0 ${slideSize}` }} onClick={() => handlePlaylistClick(playlist)}>

                            <div className="flex flex-col items-center text-center">
                                <Image
                                    alt='Playlist icon'
                                    className='object-cover rounded-lg'
                                    src={playlist.icon}
                                    width="100"
                                />
                                <span>{playlist.name}</span>
                                <span>Tracks: {playlist.tracks.length}</span>
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

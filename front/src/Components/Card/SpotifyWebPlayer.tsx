import React, { useEffect } from 'react';
import { Image, Button, Slider } from '@nextui-org/react';
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaCirclePause, FaCirclePlay  } from "react-icons/fa6";
import { TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled } from "react-icons/tb";
import { BiSolidLeftArrow } from 'react-icons/bi';
import { Playlist } from './types';
import { readFromCookies } from '../../Libs/cookies';

export const SpotifyWebPlayer = ({ playlist, onBack }: { playlist: any, onBack: () => void }) => {
    const [liked, setLiked] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const [player, setPlayer] = React.useState<any>(null);
    const [deviceId, setDeviceId] = React.useState<string | null>(null);

    useEffect(() => {
        const token = readFromCookies('spotifyToken');

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Your Spotify Connect player name',
                getOAuthToken: (cb: any) => { cb(token); },
                volume: 0.5,
            });

            // Error handling
            player.addListener('initialization_error', ({ message }: any) => { console.error(message); });
            player.addListener('authentication_error', ({ message }: any) => { console.error(message); });
            player.addListener('account_error', ({ message }: any) => { console.error(message); });
            player.addListener('playback_error', ({ message }: any) => { console.error(message); });

            // Playback status updates
            player.addListener('player_state_changed', (state: any) => { console.log(state); });

            // Ready
            player.addListener('ready', ({ device_id }: any) => {
                console.log('Ready with Device ID', device_id);
                setPlayer(player);
                setDeviceId(device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }: any) => {
                console.log('Device ID has gone offline', device_id);
            });

            // Connect to the player!
            player.connect();
        }
    }, []);

    const play = (spotify_uri: string) => {
        player._options.getOAuthToken((access_token: string) => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                body: JSON.stringify({ uris: [spotify_uri] }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
            });
        });
    };

    return (
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <Button
                isIconOnly
                className="absolute top-0 right-0 m-2 data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onClick={() => {
                    onBack();
                    player.disconnect();
                }}
            >
                <BiSolidLeftArrow />
            </Button>
            <div className="relative col-span-6 md:col-span-4">
                <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                shadow="lg"
                src={playlist.tracks[index].album}
                width="100%"
                />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                    <h3 className="font-semibold text-foreground/90">{playlist.name}</h3>
                    <p className="text-small text-foreground/80">{playlist.tracks.length} Tracks</p>
                    <h1 className="text-large font-medium mt-2">{playlist.tracks[index].name}</h1>
                </div>
            </div>

                <div className="flex flex-col mt-3 gap-1">
                <Slider
                    aria-label="Music progress"
                    classNames={{
                    track: "bg-default-500/30",
                    thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                    }}
                    color="foreground"
                    defaultValue={33}
                    size="sm"
                />
                <div className="flex justify-between">
                    <p className="text-small">1:23</p>
                    <p className="text-small text-foreground/50">4:32</p>
                </div>
                </div>

                <div className="flex w-full items-center justify-center">
                <Button
                    isIconOnly
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    onClick={() => setIndex((i) => (i - 1 + playlist.tracks.length) % playlist.tracks.length)}
                >
                    <TbPlayerSkipBackFilled />
                </Button>
                <Button
                    isIconOnly
                    className="w-auto h-auto data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    onPress={() => {
                        setIsPlaying((v) => !v);
                        if (isPlaying) {
                            player.pause();
                        } else {
                            play(playlist.tracks[index].uri);
                        }
                    }}
                >
                    {isPlaying ? <FaCirclePause size={54} /> : <FaCirclePlay size={54} />}
                </Button>
                <Button
                    isIconOnly
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    onClick={() => setIndex((i) => (i + 1) % playlist.tracks.length)}
                >
                    <TbPlayerSkipForwardFilled />
                </Button>
                </div>
            </div>
        </div>
    );
}
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import styles from "./Card.module.css";
import { CardWidgetProps } from "./types";
import { WeatherBody } from "./WeatherBody";
import { AnimeBody } from "./AnimeBody";
import { LeagueBody } from "./LeagueBody";
import { SpotifyBody } from "./SpotifyBody";

const playlists = [
    {
        "id": "30L94nYG8PTtJxqYF4VMTP",
        "name": "Playlist 1",
        "icon": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9",
        "tracks": [
            { "name": "Track 1", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" },
            { "name": "Track 2", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" },
            { "name": "Track 3", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" }
        ]
    },
    {
        "id": "68LovypAk00KTt2kzspLZb",
        "name": "Playlist 2",
        "icon": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebb5660f3df3d7357918a3894a8",
        "tracks": [
            { "name": "Track 4", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" },
            { "name": "Track 5", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" },
            { "name": "Track 6", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" }
        ]
    },
    {
        "id": "3J8nle0SLzBf8KZrVrIXLH",
        "name": "Playlist 3",
        "icon": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9",
        "tracks": [
            { "name": "Track 7", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" },
            { "name": "Track 8", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" },
            { "name": "Track 9", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" }
        ]
    },
    {
        "id": "3HdLe3sTtqyLWtW41SwYMi",
        "name": "Playlist 4",
        "icon": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebb5660f3df3d7357918a3894a8",
        "tracks": [
            { "name": "Track 10", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" },
            { "name": "Track 11", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" },
            { "name": "Track 12", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" }
        ]
    },
    {
        "id": "5cMm30fsXTU0WhcLlcBtHs",
        "name": "Playlist 5",
        "icon": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9",
        "tracks": [
            { "name": "Track 13", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" },
            { "name": "Track 14", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" },
            { "name": "Track 15", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" }
        ]
    },
    {
        "id": "3fo7kLpQWBZKj6I2wrWhfG",
        "name": "Playlist 6",
        "icon": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebb5660f3df3d7357918a3894a8",
        "tracks": [
            { "name": "Track 16", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" },
            { "name": "Track 17", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" },
            { "name": "Track 18", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" }
        ]
    },
    {
        "id": "6Xd3GTn4EMMABCOtCyYIyT",
        "name": "Playlist 7",
        "icon": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9",
        "tracks": [
            { "name": "Track 19", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" },
            { "name": "Track 20", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" },
            { "name": "Track 21", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" }
        ]
    },
    {
        "id": "5lK4aZXOBZHkGBIqBt1fI0",
        "name": "Playlist 8",
        "icon": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebb5660f3df3d7357918a3894a8",
        "tracks": [
            { "name": "Track 22", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" },
            { "name": "Track 23", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" },
            { "name": "Track 24", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" }
        ]
    },
    {
        "id": "0Lgexdudj2xy69jLvS7Y89",
        "name": "Playlist 9",
        "icon": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9",
        "tracks": [
            { "name": "Track 25", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" },
            { "name": "Track 26", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" },
            { "name": "Track 27", "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "album": "https://i.scdn.co/image/ab67616d0000b2734f61e186facbb486f79e9fd9" }
        ]
    },
    {
        "id": "0KbTbWGcDBBPNolPCL8ib8",
        "name": "Playlist 10",
        "icon": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebb5660f3df3d7357918a3894a8",
        "tracks": [
            { "name": "Track 28", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" },
            { "name": "Track 29", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" },
            { "name": "Track 30", "uri": "spotify:track:5aJT7dU40Ry4zz1zI34845", "album": "https://i.scdn.co/image/ab67616d0000b273fa2e6dda525e85359866abb6" }
        ]
    }
];

export const CardWidget = ({ size }: CardWidgetProps) => {
    return (
        <Card className={`py-4 ${styles[size]}`}>
            <CardHeader className='pb-0 pt-2 px-4 flex-col items-center'>
                <h4 className='font-bold text-large'>NAGISA BEST WAIFU</h4>
            </CardHeader>
            <CardBody className='overflow-visible py-2 gap-4'>
                <SpotifyBody 
                    size={size} 
                    playlists={playlists}
                />
            </CardBody>
        </Card>
    );
};

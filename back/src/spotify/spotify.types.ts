interface TrackItem {
    track: {
        name: string;
        uri: string;
        album: {
            images: { url: string }[];
        };
    };
}

interface PlaylistItem {
    id: string;
    name: string;
    images: { url: string }[];
}


export { TrackItem, PlaylistItem }
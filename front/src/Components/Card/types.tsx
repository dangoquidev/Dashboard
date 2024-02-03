export type CardWidgetProps = {
	size: "small" | "medium" | "large";
};

export type WeatherBodyProps = {
    size: "small" | "medium" | "large";
    city: string;
    icon: string;
    temp: number;
    precip: number;
    humidity: number;
    wind: number;
}

export type AnimeBodyProps = {
    size: "small" | "medium" | "large";
    title: string;
    description: string;
    image: string;
    rating: string;
    year: string;
    episode: number;
}

export type LeagueRank = {
    rank: string;
    tier: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    wr: string;
}

type LeagueGames = {
    duration: string;
    isWin: boolean;
    gameMode: string;
    gameEndTime: string;
    championIcon: string;
    kda: string;
    cs: number;
}

export type LeagueBodyProps = {
    size: "small" | "medium" | "large";
    rankInfo: LeagueRank;
    games: LeagueGames[]
    name: string
}

export type YoutubeBodyProps = {
    name: string;
    size: "small" | "medium" | "large";
    profilePicture: string;
    subscribers: number;
    views: number;
    videos: number;
};

type Track = {
    name: string;
    uri: string;
    album: string;
};

export type Playlist = {
    id: string;
    name: string;
    icon: string;
    tracks: Track[];
};

export type SpotifyBodyProps = {
    playlists: Playlist[];
    size: "small" | "medium" | "large";
};
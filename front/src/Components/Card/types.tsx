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

type LeagueRank = {
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
    rank: LeagueRank;
    games: LeagueGames[]
    name: string
}


interface YoutubeWidget {
    channelStats?: {
        viewCount: string;
        subscriberCount: string;
        hiddenSubscriberCount: boolean;
        videoCount: string;
    };
    userStats?: {
        viewCount: string;
        subscriberCount: string;
        hiddenSubscriberCount: boolean;
        videoCount: string;
    };
    profilePicture?: string;
}

interface RankWidget {
    rank: string;
    tier: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    wr: string;
}

interface AnimeWidget {
    title: string;
    description: string;
    rating: string;
    image_url: string;
    episodes: number;
    year: string;
}

interface MatchWidget {
    gameDuration: string;
    isWin: boolean;
    gameMode: string;
    gameEndTime: string;
    champion: string;
    championImage: string;
    kda: string;
    cs: number;
    itemsArray: string[];
    itemsNameArray: string[];
}

interface TrackWidget {
    name: string;
    uri: string;
    album: string;
}

interface PlaylistWidget {
    id: string;
    name: string;
    icon: string;
    tracks?: TrackWidget[];
}

interface WeatherWidget {
    city: string;
    temperature: number;
    icon: string;
    precipitation: number;
    windSpeed: number;
    humidity: number;
}

interface Widgets {
    id: number;
    title: string;
    type: string;
    data?: AnimeWidget | YoutubeWidget | RankWidget | MatchWidget | PlaylistWidget | WeatherWidget;
}


export default Widgets
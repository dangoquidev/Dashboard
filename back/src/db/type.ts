interface MatchHistoryData {
    gameDuration: string
    isWin: boolean
    gameMode: string
    gameEndTime: string
    champion: string
    kda: string
    cs: number
    itemsArray: string[]
    itemsNameArray: string[]
}

interface RankUserData {
    rank: string
    leaguePoints: number
    wins: number
    losses: number
}

interface WeatherData {
    weather: string
}

interface Widgets {
    id: number
    title: string
    type: string
    data?: MatchHistoryData | RankUserData | WeatherData
}

export default Widgets
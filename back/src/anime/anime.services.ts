import axios from "axios";

export const getAnime = async (title: string) => {
    try  {
        const url = `https://kitsu.io/api/edge/anime?filter[text]=${title}`;

        const response = await axios.get(url);
        const data = response.data.data[0];

        const ratingPercentage = parseFloat(data.attributes.averageRating);
        const ratingOutOf5 = ratingPercentage / 20;

        const startYear = new Date(data.attributes.startDate).getFullYear();
        const endYear = new Date(data.attributes.endDate).getFullYear();
        let year;
        if (startYear === endYear) {
            year = `${startYear}`;
        } else {
            year = `${startYear}/${endYear}`;
        }

        const anime = {
            title: data.attributes.titles.en,
            description: data.attributes.synopsis,
            rating: ratingOutOf5.toFixed(2),
            image_url: data.attributes.posterImage.small,
            episodes: data.attributes.episodeCount,
            year,
        };

        return anime;
    } catch (error) {
        console.error(error);
        return null;
    }
}

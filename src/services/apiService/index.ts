import axios from "axios";
import { movieType } from "../../helper/interface";
const baseURL = process.env.REACT_APP_API_BASE_URL as string;
const movies: Array<movieType> = [];
const languages: Array<string> = [];
const genres: Array<string> = [];
let isDataSet = false;

const youtubeURL = "https://www.youtube.com/";

export const getMoviesData = async (): Promise<void> => {
  try {
    const moviesData = await axios.get(baseURL);
    if (!isDataSet) {
      setData(moviesData.data);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// to check wheither the image link is visible or not
export const isImageAvailable = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url);

    if (response.status === 200) {
      // Status code 200 means the image is available
      return true;
    } else {
      // Any other status code indicates the image is not available
      return false;
    }
  } catch (error) {
    // An error occurred, indicating the image is not available
    return false;
  }
};
// Setting data for filter list and video list on load of the application
const setData = (data: any): void => {
  Object.values(data.moviesData).forEach((element: any) => {
    const movie: movieType = {
      title: element.EventTitle,
      thumbnail:
        process.env.REACT_APP_THUMBNAIL_BASE_URL +
        element.EventImageCode +
        ".jpg",
      videoURI: `${youtubeURL}embed/${getYoutubeVideoID(element.TrailerURL)}`,
      votes: element.ratings.totalWTSCount,
      like: element.ratings.wtsPerc,
      language: element.EventLanguage,
      genres: element.EventGenre.split("|"),
      displayDate: element.ShowDate.split(",")[0].split(" "),
      fullDate: element.ShowDate,
    };
    element.EventGenre.split("|").forEach((genre: string) => {
      if (!genres.includes(genre.toLowerCase()) && genre) {
        genres.push(genre.toLowerCase());
      }
    });
    movies.push(movie);
  });
  data.languageList.forEach((lang: string) => languages.push(lang));
  isDataSet = true;
};

// to get the video id so that we could generate embad code to render the youtube
const getYoutubeVideoID = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

export const getMovies = (): Array<movieType> => {
  return movies;
};

export const getLanguages = (): Array<string> => {
  return languages;
};

export const getGenres = (): Array<string> => {
  return genres;
};

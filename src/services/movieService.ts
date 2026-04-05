import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
interface MovieData {
  results: Movie[];
  total_pages: number;
}

const myKey = import.meta.env.VITE_API_KEY;

export const fetchMovies = async (
  query: string,
  page: number = 1,
): Promise<MovieData> => {
  const response = await axios.get<FetchMoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: query,
        page: page,
        include_adult: false,
        language: "en-US",
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
        accept: "application/json",
      },
    },
  );
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};

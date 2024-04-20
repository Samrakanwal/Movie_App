import axios from 'axios';

const BASE_URL = 'https://search.imdbot.workers.dev/';

//FetchMovies api call
export const fetchRandomMovies = () => {
  return axios.get(`${BASE_URL}/movies/random`);
};
//SearchMovies api call
export const searchMovies = (query: string) => {
  return axios.get(`${BASE_URL}/search`, { params: { query } });
};
//MoviesDetail api call
export const getMovieDetails = (id: string) => {
  return axios.get(`${BASE_URL}/movies/${id}`);
};

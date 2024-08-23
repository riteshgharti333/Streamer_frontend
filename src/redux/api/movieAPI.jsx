import axios from "axios";

const baseUrl = import.meta.env.VITE_API_KEY;

//GET ALL MOVIES
export const getMovies = () => {
  return axios.get(`${baseUrl}/movies`);
};

//GET QUERY MOVIES
export const getQueryMovies = (query) => {
  return axios.get(`${baseUrl}/movies/query?type=${query}`);
};

//GET SINLGE MOVIE
export const getSingleMovie = (id) => {
  return axios.get(`${baseUrl}/movies/${id}`);
};


//GET RANDOM MOVIES
export const getRandomMovies = (query) => {
  return axios.get(`${baseUrl}/movies/random?type=${query}`);
};
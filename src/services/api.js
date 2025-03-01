import axios from 'axios';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// Function to search movies by query (used for searching specific movies)
export const searchMovies = async (query, page = 1) => {
  try {
    const { data } = await api.get('', {
      params: {
        s: query,
        page,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};

// Function to get details for a specific movie
export const getMovieDetails = async (id) => {
  try {
    const { data } = await api.get('', {
      params: {
        i: id,
        plot: 'full',
      },
    });
    return data;
  } catch (error) {
    throw new Error('Failed to fetch movie details');
  }
};

// Function to get the latest movies released in 2024 (based on pagination)
export const getLatestMovies = async (page = 1) => {
  try {
    const { data } = await api.get('', {
      params: {
        s: 'movie', // General search term to get movies
        y: '2025', // Filter movies by the year 2024
        page, // Pagination support
      },
    });

    return data;
  } catch (error) {
    throw new Error('Failed to fetch latest movies');
  }
};

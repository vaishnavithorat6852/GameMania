import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const fetchGames = async (params = {}) => {
  const response = await api.get('/games', { params });
  return response.data;
};

export const fetchGameDetails = async (id) => {
  const response = await api.get(`/games/${id}`);
  return response.data;
};

export const fetchGameScreenshots = async (id) => {
  const response = await api.get(`/games/${id}/screenshots`);
  return response.data;
};

export const fetchGenres = async () => {
  const response = await api.get('/genres');
  return response.data;
};

export const fetchGameTrailers = async (id) => {
  const response = await api.get(`/games/${id}/movies`);
  return response.data;
}

export default api;

import { fetchApi } from './fetch-api';
import { API_HOST } from '../config';

// -- function get configuration --
const apiConfigLanguages = () => `${API_HOST}configuration/languages`;
export const getConfigLanguages = () => {
  return fetchApi({
    url: apiConfigLanguages(),
  });
};

const apiConfigCountries = () => `${API_HOST}configuration/countires`;
export const getConfigCountries = () => {
  return fetchApi({
    url: apiConfigCountries(),
  });
};

// -- function get movie --
const apiMovieTrending = () =>
  `${API_HOST}trending/movie/day?language=en-US&page=1&region=ID`;
export const getMovieTrending = () => {
  return fetchApi({
    url: apiMovieTrending(),
  });
};

const apiMovieGenre = () => `${API_HOST}genre/movie/list?language=en`;
export const getMovieGenre = () => {
  return fetchApi({
    url: apiMovieGenre(),
  });
};

const apiMovieNowPlaying = () =>
  `${API_HOST}movie/now_playing?language=en-US&page=1&region=ID`;
export const getMovieNowPlaying = () => {
  return fetchApi({
    url: apiMovieNowPlaying(),
  });
};

const apiMoviePopular = () =>
  `${API_HOST}movie/popular?language=en-US&page=1&region=ID`;
export const getMoviePopular = () => {
  return fetchApi({
    url: apiMoviePopular(),
  });
};

const apiMovieTopRated = () =>
  `${API_HOST}movie/top_rated?language=en-US&page=1&region=ID`;
export const getMovieTopRated = () => {
  return fetchApi({
    url: apiMovieTopRated(),
  });
};

const apiMovieUpcoming = () =>
  `${API_HOST}movie/upcoming?language=en-US&page=1&region=ID`;
export const getMovieUpcoming = () => {
  return fetchApi({
    url: apiMovieUpcoming(),
  });
};

const apiMovieSearch = (keyword = '') =>
  `${API_HOST}search/movie?query=${keyword}&language=en-US&page=1&region=ID`;
export const getMovieSearch = ({ queryKey }) => {
  const [, { keyword }] = queryKey;
  return fetchApi({
    url: apiMovieSearch(keyword),
  });
};

const apiMovieDetail = (movie_id = '') =>
  `${API_HOST}movie/${movie_id}?language=en-US`;
export const getMovieDetail = ({ queryKey }) => {
  const [, { movie_id }] = queryKey;
  return fetchApi({
    url: apiMovieDetail(movie_id),
  });
};

const apiMovieDetailCredits = (movie_id = '') =>
  `${API_HOST}movie/${movie_id}/credits?language=en-US`;
export const getMovieDetailCredits = ({ queryKey }) => {
  const [, { movie_id }] = queryKey;
  return fetchApi({
    url: apiMovieDetailCredits(movie_id),
  });
};

const apiMovieDetailVideos = (movie_id = '') =>
  `${API_HOST}movie/${movie_id}/videos?language=en-US`;
export const getMovieDetailVideos = ({ queryKey }) => {
  const [, { movie_id }] = queryKey;
  return fetchApi({
    url: apiMovieDetailVideos(movie_id),
  });
};

const apiMovieDetailSimilar = (movie_id = '') =>
  `${API_HOST}movie/${movie_id}/similar?language=en-US`;
export const getMovieDetailSimilar = ({ queryKey }) => {
  const [, { movie_id }] = queryKey;
  return fetchApi({
    url: apiMovieDetailSimilar(movie_id),
  });
};

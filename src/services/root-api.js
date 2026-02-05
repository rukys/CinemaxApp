import { fetchApi } from './fetch-api';
import { API_HOST } from '../config';

// -- function get configuration --
const apiConfigLanguages = () => `${API_HOST}configuration/languages`;
export const getConfigLanguages = () => {
  return fetchApi({
    url: apiConfigLanguages(),
  });
};

const apiConfigCountries = () =>
  `${API_HOST}configuration/countries?language=en-US`;
export const getConfigCountries = () => {
  return fetchApi({
    url: apiConfigCountries(),
  });
};

// -- function get movie --
const apiMovieTrending = (countryCode = '') =>
  `${API_HOST}trending/movie/day?language=en-US&page=1&region=${countryCode}`;
export const getMovieTrending = ({ queryKey }) => {
  const [, { countryCode }] = queryKey;
  return fetchApi({
    url: apiMovieTrending(countryCode),
  });
};

const apiMovieGenre = () => `${API_HOST}genre/movie/list?language=en-US`;
export const getMovieGenre = () => {
  return fetchApi({
    url: apiMovieGenre(),
  });
};

const apiMovieNowPlaying = (countryCode = '') =>
  `${API_HOST}movie/now_playing?language=en-US&page=1&region=${countryCode}`;
export const getMovieNowPlaying = ({ queryKey }) => {
  const [, { countryCode }] = queryKey;
  return fetchApi({
    url: apiMovieNowPlaying(countryCode),
  });
};

const apiMoviePopular = (countryCode = '') =>
  `${API_HOST}movie/popular?language=en-US&page=1&region=${countryCode}`;
export const getMoviePopular = ({ queryKey }) => {
  const [, { countryCode }] = queryKey;
  return fetchApi({
    url: apiMoviePopular(countryCode),
  });
};

const apiMovieTopRated = (countryCode = '') =>
  `${API_HOST}movie/top_rated?language=en-US&page=1&region=${countryCode}`;
export const getMovieTopRated = ({ queryKey }) => {
  const [, { countryCode }] = queryKey;
  return fetchApi({
    url: apiMovieTopRated(countryCode),
  });
};

const apiMovieUpcoming = (countryCode = '') =>
  `${API_HOST}movie/upcoming?language=en-US&page=1&region=${countryCode}`;
export const getMovieUpcoming = ({ queryKey }) => {
  const [, { countryCode }] = queryKey;
  return fetchApi({
    url: apiMovieUpcoming(countryCode),
  });
};

const apiMovieSearch = (keyword = '') =>
  `${API_HOST}search/movie?query=${keyword}&language=en-US&page=1`;
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

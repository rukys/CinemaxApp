import { fetchApi } from './fetch-api';
import { API_HOST } from '../config';

const DEFAULT_LANGUAGE = 'en-US';

// Query strings are passed through axios `params` so every value is
// URL-encoded (e.g. a search keyword containing "&" or "#").
const get = (path, params = {}) =>
  fetchApi({
    url: `${API_HOST}${path}`,
    params: { language: DEFAULT_LANGUAGE, ...params },
  });

// TMDB rejects an empty `region`, so only send it when it is set.
const withRegion = (countryCode, params = {}) =>
  countryCode ? { ...params, region: countryCode } : params;

// -- function get configuration --
export const getConfigLanguages = () => {
  return fetchApi({ url: `${API_HOST}configuration/languages` });
};

export const getConfigCountries = () => {
  return get('configuration/countries');
};

// -- function get movie --
export const getMovieTrending = ({ queryKey }) => {
  const [, { countryCode }] = queryKey;
  return get('trending/movie/day', withRegion(countryCode, { page: 1 }));
};

export const getMovieGenre = () => {
  return get('genre/movie/list');
};

export const getMovieNowPlaying = ({ queryKey }) => {
  const [, { countryCode }] = queryKey;
  return get('movie/now_playing', withRegion(countryCode, { page: 1 }));
};

export const getMoviePopular = ({ queryKey }) => {
  const [, { countryCode }] = queryKey;
  return get('movie/popular', withRegion(countryCode, { page: 1 }));
};

export const getMovieTopRated = ({ queryKey }) => {
  const [, { countryCode }] = queryKey;
  return get('movie/top_rated', withRegion(countryCode, { page: 1 }));
};

export const getMovieUpcoming = ({ queryKey }) => {
  const [, { countryCode }] = queryKey;
  return get('movie/upcoming', withRegion(countryCode, { page: 1 }));
};

export const getMovieSearch = ({ queryKey }) => {
  const [, { keyword }] = queryKey;
  return get('search/movie', { query: keyword, page: 1 });
};

export const getMovieDetail = ({ queryKey }) => {
  const [, { movie_id }] = queryKey;
  return get(`movie/${movie_id}`);
};

export const getMovieDetailCredits = ({ queryKey }) => {
  const [, { movie_id }] = queryKey;
  return get(`movie/${movie_id}/credits`);
};

export const getMovieDetailVideos = ({ queryKey }) => {
  const [, { movie_id }] = queryKey;
  return get(`movie/${movie_id}/videos`);
};

export const getMovieDetailSimilar = ({ queryKey }) => {
  const [, { movie_id }] = queryKey;
  return get(`movie/${movie_id}/similar`);
};

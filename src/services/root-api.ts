import { fetchApi } from './fetch-api';
import { API_HOST } from '../config';
import type {
  CreditsResponse,
  GenreListResponse,
  Movie,
  MovieDetail,
  PaginatedResponse,
  VideosResponse,
} from '../types/tmdb';

const DEFAULT_LANGUAGE = 'en-US';

type QueryParams = Record<string, string | number>;

// Query strings are passed through axios `params` so every value is
// URL-encoded (e.g. a search keyword containing "&" or "#").
const get = <T>(path: string, params: QueryParams = {}) =>
  fetchApi<T>({
    url: `${API_HOST}${path}`,
    params: { language: DEFAULT_LANGUAGE, ...params },
  });

// TMDB rejects an empty `region`, so only send it when it is set.
const withRegion = (countryCode = '', params: QueryParams = {}) =>
  countryCode ? { ...params, region: countryCode } : params;

/** Movie list categories and their TMDB endpoints. */
export const MOVIE_LIST_PATHS = {
  trending: 'trending/movie/day',
  now_playing: 'movie/now_playing',
  popular: 'movie/popular',
  top_rated: 'movie/top_rated',
  upcoming: 'movie/upcoming',
} as const;

export type MovieListCategory = keyof typeof MOVIE_LIST_PATHS;

export const getMovieList = (category: MovieListCategory, countryCode = '') =>
  get<PaginatedResponse<Movie>>(
    MOVIE_LIST_PATHS[category],
    withRegion(countryCode, { page: 1 }),
  );

export const getMovieGenre = () => get<GenreListResponse>('genre/movie/list');

export const getMovieSearch = (keyword: string) =>
  get<PaginatedResponse<Movie>>('search/movie', { query: keyword, page: 1 });

export const getMovieDetail = (movieId: number | string) =>
  get<MovieDetail>(`movie/${movieId}`);

export const getMovieDetailCredits = (movieId: number | string) =>
  get<CreditsResponse>(`movie/${movieId}/credits`);

export const getMovieDetailVideos = (movieId: number | string) =>
  get<VideosResponse>(`movie/${movieId}/videos`);

export const getMovieDetailSimilar = (movieId: number | string) =>
  get<PaginatedResponse<Movie>>(`movie/${movieId}/similar`);

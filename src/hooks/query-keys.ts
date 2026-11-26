import type { MovieListCategory } from '../services/root-api';

// Single place for every React Query key, so invalidation and caching stay
// consistent across hooks.
// Movie ids are numbers from TMDB, or strings for stored favorites.
type MovieId = number | string;

export const movieKeys = {
  all: ['movies'] as const,
  list: (category: MovieListCategory, countryCode: string) =>
    [...movieKeys.all, 'list', category, countryCode] as const,
  genres: () => [...movieKeys.all, 'genres'] as const,
  search: (keyword: string) => [...movieKeys.all, 'search', keyword] as const,
  detail: (movieId: MovieId) => [...movieKeys.all, 'detail', movieId] as const,
  credits: (movieId: MovieId) =>
    [...movieKeys.all, 'detail', movieId, 'credits'] as const,
  videos: (movieId: MovieId) =>
    [...movieKeys.all, 'detail', movieId, 'videos'] as const,
  similar: (movieId: MovieId) =>
    [...movieKeys.all, 'detail', movieId, 'similar'] as const,
};

// Shared cache policy for TMDB data.
export const MOVIE_QUERY_OPTIONS = {
  staleTime: 5 * 60 * 1000, // 5 menit
  gcTime: 30 * 60 * 1000, // 30 menit
} as const;

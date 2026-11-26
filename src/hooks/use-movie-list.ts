import { useQuery } from '@tanstack/react-query';
import { getMovieList, type MovieListCategory } from '../services/root-api';
import type { Movie } from '../types/tmdb';
import { MOVIE_QUERY_OPTIONS, movieKeys } from './query-keys';

const EMPTY_MOVIES: Movie[] = [];

/**
 * One hook for every TMDB movie list (popular, upcoming, top rated,
 * now playing, trending). Replaces five copy-pasted hooks.
 */
export default function useMovieList(
  category: MovieListCategory,
  countryCode = '',
) {
  const query = useQuery({
    queryKey: movieKeys.list(category, countryCode),
    queryFn: () => getMovieList(category, countryCode),
    ...MOVIE_QUERY_OPTIONS,
  });

  return {
    movies: query.data?.results ?? EMPTY_MOVIES,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}

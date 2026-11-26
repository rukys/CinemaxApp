import { useQuery } from '@tanstack/react-query';
import { getMovieSearch } from '../services/root-api';
import type { Movie } from '../types/tmdb';
import { MOVIE_QUERY_OPTIONS, movieKeys } from './query-keys';

const EMPTY_MOVIES: Movie[] = [];

export default function useMovieSearch(keyword = '') {
  const query = useQuery({
    queryKey: movieKeys.search(keyword),
    queryFn: () => getMovieSearch(keyword),
    enabled: keyword !== '',
    ...MOVIE_QUERY_OPTIONS,
  });

  return {
    movies: query.data?.results ?? EMPTY_MOVIES,
    isLoading: query.isLoading,
  };
}

import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovieGenre } from '../services/root-api';
import type { Genre } from '../types/tmdb';
import { MOVIE_QUERY_OPTIONS, movieKeys } from './query-keys';

const EMPTY_GENRES: Genre[] = [];

export default function useMovieGenre() {
  const query = useQuery({
    queryKey: movieKeys.genres(),
    queryFn: getMovieGenre,
    ...MOVIE_QUERY_OPTIONS,
  });

  const genres = query.data?.genres ?? EMPTY_GENRES;

  const getGenreNames = useCallback(
    (ids: number[] = []) =>
      ids
        .map(id => genres.find(genre => genre.id === id)?.name)
        .filter((name): name is string => Boolean(name)),
    [genres],
  );

  return {
    genres,
    getGenreNames,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}

import { useQuery } from '@tanstack/react-query';
import {
  getMovieDetail,
  getMovieDetailCredits,
  getMovieDetailSimilar,
} from '../services/root-api';
import type { CastMember, CrewMember, Movie } from '../types/tmdb';
import { MOVIE_QUERY_OPTIONS, movieKeys } from './query-keys';

const EMPTY_CAST: CastMember[] = [];
const EMPTY_CREW: CrewMember[] = [];
const EMPTY_MOVIES: Movie[] = [];

// Videos are fetched by `use-movie-videos` to avoid a duplicate request.
export default function useMovieDetail(movieId?: number) {
  const id = movieId ?? 0;
  const enabled = Boolean(movieId);

  const detailQuery = useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => getMovieDetail(id),
    enabled,
    ...MOVIE_QUERY_OPTIONS,
  });

  const creditsQuery = useQuery({
    queryKey: movieKeys.credits(id),
    queryFn: () => getMovieDetailCredits(id),
    enabled,
    ...MOVIE_QUERY_OPTIONS,
  });

  const similarQuery = useQuery({
    queryKey: movieKeys.similar(id),
    queryFn: () => getMovieDetailSimilar(id),
    enabled,
    ...MOVIE_QUERY_OPTIONS,
  });

  return {
    detail: detailQuery.data,
    cast: creditsQuery.data?.cast ?? EMPTY_CAST,
    crew: creditsQuery.data?.crew ?? EMPTY_CREW,
    similar: similarQuery.data?.results ?? EMPTY_MOVIES,
    isLoading:
      detailQuery.isLoading || creditsQuery.isLoading || similarQuery.isLoading,
    refetch: () =>
      Promise.all([
        detailQuery.refetch(),
        creditsQuery.refetch(),
        similarQuery.refetch(),
      ]),
  };
}

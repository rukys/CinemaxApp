import { useQuery } from '@tanstack/react-query';
import { getMovieGenre } from '../services/root-api';

export default function useMovieGenre() {
  const queryMovieGenre = useQuery({
    queryKey: ['get-movie-genre'],
    queryFn: getMovieGenre,
    staleTime: 5 * 60 * 1000, // 5 menit
    gcTime: 30 * 60 * 1000, // 30 menit
  });
  const resultMovieGenre = queryMovieGenre?.data?.genres || [];

  const isLoadingMovieGenre = queryMovieGenre.isLoading;

  const onRefetchMovieGenre = () => {
    return queryMovieGenre.refetch();
  };

  const getGenreNames = (ids = []) =>
    ids
      .map(id => resultMovieGenre.find(g => g.id === id)?.name)
      .filter(Boolean);

  return {
    getGenreNames,
    resultMovieGenre,
    isLoadingMovieGenre,
    onRefetchMovieGenre,
  };
}

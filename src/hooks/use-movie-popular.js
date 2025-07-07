import { useQuery } from 'react-query';
import { getMoviePopular } from '../services/root-api';

export default function useMoviePopular() {
  const queryMoviePopular = useQuery(['get-movie-popular'], getMoviePopular, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const resultMoviePopular = queryMoviePopular?.data?.results || [];

  const isLoadingMoviePopular = queryMoviePopular.isLoading;

  const onRefetchMoviePopular = () => {
    queryMoviePopular.refetch();
  };

  return {
    resultMoviePopular,
    isLoadingMoviePopular,
    onRefetchMoviePopular,
  };
}

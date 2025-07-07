import { useQuery } from 'react-query';
import { getMovieTopRated } from '../services/root-api';

export default function useMovieToprated() {
  const queryMovieToprated = useQuery(
    ['get-movie-toprated'],
    getMovieTopRated,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );

  const resultMovieToprated = queryMovieToprated?.data?.results || [];

  const isLoadingMovieToprated = queryMovieToprated.isLoading;

  const onRefetchMovieToprated = () => {
    queryMovieToprated.refetch();
  };

  return {
    resultMovieToprated,
    isLoadingMovieToprated,
    onRefetchMovieToprated,
  };
}

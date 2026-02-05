import { useQuery } from 'react-query';
import { getMovieTopRated } from '../services/root-api';

export default function useMovieToprated(params = '') {
  const queryMovieToprated = useQuery(
    ['get-movie-toprated', { countryCode: params }],
    getMovieTopRated,
    {
      staleTime: 5 * 60 * 1000, // 5 menit
      cacheTime: 30 * 60 * 1000, // 30 menit
    },
  );

  const resultMovieToprated = queryMovieToprated?.data?.results || [];

  const isLoadingMovieToprated = queryMovieToprated.isLoading;

  const onRefetchMovieToprated = () => {
    return queryMovieToprated.refetch();
  };

  return {
    resultMovieToprated,
    isLoadingMovieToprated,
    onRefetchMovieToprated,
  };
}

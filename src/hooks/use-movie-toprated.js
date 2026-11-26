import { useQuery } from '@tanstack/react-query';
import { getMovieTopRated } from '../services/root-api';

export default function useMovieToprated(params = '') {
  const queryMovieToprated = useQuery({
    queryKey: ['get-movie-toprated', { countryCode: params }],
    queryFn: getMovieTopRated,
      staleTime: 5 * 60 * 1000, // 5 menit
      gcTime: 30 * 60 * 1000, // 30 menit
  });

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

import { useQuery } from '@tanstack/react-query';
import { getMoviePopular } from '../services/root-api';

export default function useMoviePopular(params = '') {
  const queryMoviePopular = useQuery({
    queryKey: ['get-movie-popular', { countryCode: params }],
    queryFn: getMoviePopular,
      staleTime: 5 * 60 * 1000, // 5 menit
      gcTime: 30 * 60 * 1000, // 30 menit
  });
  const resultMoviePopular = queryMoviePopular?.data?.results || [];

  const isLoadingMoviePopular = queryMoviePopular.isLoading;

  const onRefetchMoviePopular = () => {
    return queryMoviePopular.refetch();
  };

  return {
    resultMoviePopular,
    isLoadingMoviePopular,
    onRefetchMoviePopular,
  };
}

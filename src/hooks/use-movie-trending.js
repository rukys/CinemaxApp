import { useQuery } from '@tanstack/react-query';
import { getMovieTrending } from '../services/root-api';

export default function useMovieTrending(params = '') {
  const queryMovieTrending = useQuery({
    queryKey: ['get-movie-trending', { countryCode: params }],
    queryFn: getMovieTrending,
      staleTime: 5 * 60 * 1000, // 5 menit
      gcTime: 30 * 60 * 1000, // 30 menit
  });
  const resultMovieTrending = queryMovieTrending?.data?.results || [];

  const isLoadingMovieTrending = queryMovieTrending.isLoading;

  const onRefetchMovieTrending = () => {
    return queryMovieTrending.refetch();
  };

  return {
    resultMovieTrending,
    isLoadingMovieTrending,
    onRefetchMovieTrending,
  };
}

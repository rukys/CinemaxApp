import { useQuery } from '@tanstack/react-query';
import { getMovieUpcoming } from '../services/root-api';

export default function useMovieUpcoming(params = '') {
  const queryMovieUpcoming = useQuery({
    queryKey: ['get-movie-upcoming', { countryCode: params }],
    queryFn: getMovieUpcoming,
      staleTime: 5 * 60 * 1000, // 5 menit
      gcTime: 30 * 60 * 1000, // 30 menit
  });
  const resultMovieUpcoming = queryMovieUpcoming?.data?.results || [];

  const isLoadingMovieUpcoming = queryMovieUpcoming.isLoading;

  const onRefetchMovieUpcoming = () => {
    return queryMovieUpcoming.refetch();
  };

  return {
    resultMovieUpcoming,
    isLoadingMovieUpcoming,
    onRefetchMovieUpcoming,
  };
}

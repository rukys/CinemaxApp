import { useQuery } from 'react-query';
import { getMovieUpcoming } from '../services/root-api';

export default function useMovieUpcoming(params = '') {
  const queryMovieUpcoming = useQuery(
    ['get-movie-upcoming', { countryCode: params }],
    getMovieUpcoming,
    {
      staleTime: 5 * 60 * 1000, // 5 menit
      cacheTime: 30 * 60 * 1000, // 30 menit
    },
  );
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

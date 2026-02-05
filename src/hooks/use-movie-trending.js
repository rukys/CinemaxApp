import { useQuery } from 'react-query';
import { getMovieTrending } from '../services/root-api';

export default function useMovieTrending(params = '') {
  const queryMovieTrending = useQuery(
    ['get-movie-trending', { countryCode: params }],
    getMovieTrending,
    {
      staleTime: 5 * 60 * 1000, // 5 menit
      cacheTime: 30 * 60 * 1000, // 30 menit
    },
  );
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

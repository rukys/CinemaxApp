import { useQuery } from 'react-query';
import { getMovieTrending } from '../services/root-api';

export default function useMovieTrending() {
  const queryMovieTrending = useQuery(
    ['get-movie-trending'],
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

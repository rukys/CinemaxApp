import { useQuery } from 'react-query';
import { getMovieTrending } from '../services/root-api';

export default function useMovieTrending() {
  const queryMovieTrending = useQuery(
    ['get-movie-trending'],
    getMovieTrending,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );
  const resultMovieTrending = queryMovieTrending?.data?.results || [];

  const isLoadingMovieTrending = queryMovieTrending.isLoading;

  const onRefetchMovieTrending = () => {
    queryMovieTrending.refetch();
  };

  return {
    resultMovieTrending,
    isLoadingMovieTrending,
    onRefetchMovieTrending,
  };
}

import { useQuery } from 'react-query';
import { getMovieUpcoming } from '../services/root-api';

export default function useMovieUpcoming() {
  const queryMovieUpcoming = useQuery(
    ['get-movie-upcoming'],
    getMovieUpcoming,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );
  const resultMovieUpcoming = queryMovieUpcoming?.data?.results || [];

  const isLoadingMovieUpcoming = queryMovieUpcoming.isLoading;

  const onRefetchMovieUpcoming = () => {
    queryMovieUpcoming.refetch();
  };

  return {
    resultMovieUpcoming,
    isLoadingMovieUpcoming,
    onRefetchMovieUpcoming,
  };
}

import { useQuery } from 'react-query';
import { getMovieSearch } from '../services/root-api';

export default function useMovieSearch(params = '') {
  const queryMovieSearch = useQuery(
    ['get-movie-search', { keyword: params }],
    getMovieSearch,
    {
      enabled: !!params,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );
  const resultMovieSearch = queryMovieSearch?.data?.results || [];

  const isLoadingMovieSearch = queryMovieSearch.isLoading;

  const onRefetchMovieSearch = () => {
    queryMovieSearch.refetch();
  };

  return {
    resultMovieSearch,
    isLoadingMovieSearch,
    onRefetchMovieSearch,
  };
}

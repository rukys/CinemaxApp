import { useQuery } from 'react-query';
import { getMovieSearch } from '../services/root-api';

export default function useMovieSearch(params = '') {
  const queryMovieSearch = useQuery(
    ['get-movie-search', { keyword: params }],
    getMovieSearch,
    {
      enabled: !!params,
      staleTime: 5 * 60 * 1000, // 5 menit
      cacheTime: 30 * 60 * 1000, // 30 menit
    },
  );
  const resultMovieSearch = queryMovieSearch?.data?.results || [];

  const isLoadingMovieSearch = queryMovieSearch.isLoading;

  const onRefetchMovieSearch = () => {
    return queryMovieSearch.refetch();
  };

  return {
    resultMovieSearch,
    isLoadingMovieSearch,
    onRefetchMovieSearch,
  };
}

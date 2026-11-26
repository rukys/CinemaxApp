import { useQuery } from '@tanstack/react-query';
import {
  getMovieDetail,
  getMovieDetailCredits,
  getMovieDetailSimilar,
} from '../services/root-api';

export default function useMovieDetail(params = '') {
  const queryMovieDetail = useQuery({
    queryKey: ['get-movie-detail', { movie_id: params }],
    queryFn: getMovieDetail,
      enabled: !!params,
      staleTime: 5 * 60 * 1000, // 5 menit
      gcTime: 30 * 60 * 1000, // 30 menit
  });
  const resultMovieDetail = queryMovieDetail?.data || [];
  const isLoadingMovieDetail = queryMovieDetail.isLoading;
  const onRefetchMovieDetail = () => {
    return queryMovieDetail.refetch();
  };

  const queryMovieDetailCredits = useQuery({
    queryKey: ['get-movie-detail-credits', { movie_id: params }],
    queryFn: getMovieDetailCredits,
      enabled: !!params,
      staleTime: 5 * 60 * 1000, // 5 menit
      gcTime: 30 * 60 * 1000, // 30 menit
  });
  const resultMovieDetailCredits = queryMovieDetailCredits?.data || [];
  const isLoadingMovieDetailCredits = queryMovieDetailCredits.isLoading;
  const onRefetchMovieDetailCredits = () => {
    return queryMovieDetailCredits.refetch();
  };

  // Videos are fetched by `use-movie-videos` to avoid a duplicate request.

  const queryMovieDetailSimilar = useQuery({
    queryKey: ['get-movie-detail-similar', { movie_id: params }],
    queryFn: getMovieDetailSimilar,
      enabled: !!params,
      staleTime: 5 * 60 * 1000, // 5 menit
      gcTime: 30 * 60 * 1000, // 30 menit
  });
  const resultMovieDetailSimilar = queryMovieDetailSimilar?.data?.results || [];
  const isLoadingMovieDetailSimilar = queryMovieDetailSimilar.isLoading;
  const onRefetchMovieDetailSimilar = () => {
    return queryMovieDetailSimilar.refetch();
  };

  return {
    resultMovieDetail,
    isLoadingMovieDetail,
    onRefetchMovieDetail,

    resultMovieDetailCredits,
    isLoadingMovieDetailCredits,
    onRefetchMovieDetailCredits,

    resultMovieDetailSimilar,
    isLoadingMovieDetailSimilar,
    onRefetchMovieDetailSimilar,
  };
}

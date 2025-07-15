import { useQuery } from 'react-query';
import {
  getMovieDetail,
  getMovieDetailCredits,
  getMovieDetailSimilar,
  getMovieDetailVideos,
} from '../services/root-api';

export default function useMovieDetail(params = '') {
  const queryMovieDetail = useQuery(
    ['get-movie-detail', { movie_id: params }],
    getMovieDetail,
    {
      enabled: !!params,
      staleTime: 5 * 60 * 1000, // 5 menit
      cacheTime: 30 * 60 * 1000, // 30 menit
    },
  );
  const resultMovieDetail = queryMovieDetail?.data || [];
  const isLoadingMovieDetail = queryMovieDetail.isLoading;
  const onRefetchMovieDetail = () => {
    return queryMovieDetail.refetch();
  };

  const queryMovieDetailCredits = useQuery(
    ['get-movie-detail-credits', { movie_id: params }],
    getMovieDetailCredits,
    {
      enabled: !!params,
      staleTime: 5 * 60 * 1000, // 5 menit
      cacheTime: 30 * 60 * 1000, // 30 menit
    },
  );
  const resultMovieDetailCredits = queryMovieDetailCredits?.data || [];
  const isLoadingMovieDetailCredits = queryMovieDetailCredits.isLoading;
  const onRefetchMovieDetailCredits = () => {
    return queryMovieDetailCredits.refetch();
  };

  const queryMovieDetailVideos = useQuery(
    ['get-movie-detail-videos', { movie_id: params }],
    getMovieDetailVideos,
    {
      enabled: !!params,
      staleTime: 5 * 60 * 1000, // 5 menit
      cacheTime: 30 * 60 * 1000, // 30 menit
    },
  );
  const resultMovieDetailVideos = queryMovieDetailVideos?.data?.results || [];
  const isLoadingMovieDetailVideos = queryMovieDetailVideos.isLoading;
  const onRefetchMovieDetailVideos = () => {
    return queryMovieDetailVideos.refetch();
  };

  const queryMovieDetailSimilar = useQuery(
    ['get-movie-detail-similar', { movie_id: params }],
    getMovieDetailSimilar,
    {
      enabled: !!params,
      staleTime: 5 * 60 * 1000, // 5 menit
      cacheTime: 30 * 60 * 1000, // 30 menit
    },
  );
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

    resultMovieDetailVideos,
    isLoadingMovieDetailVideos,
    onRefetchMovieDetailVideos,

    resultMovieDetailSimilar,
    isLoadingMovieDetailSimilar,
    onRefetchMovieDetailSimilar,
  };
}

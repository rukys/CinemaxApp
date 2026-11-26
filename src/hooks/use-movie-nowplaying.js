import { useQuery } from '@tanstack/react-query';
import { getMovieNowPlaying } from '../services/root-api';
import { getLocalDateString } from '../utils';

export default function useMovieNowplaying(params = '') {
  const today = getLocalDateString();

  const queryMovieNowplaying = useQuery({
    queryKey: ['get-movie-nowplaying', { countryCode: params }],
    queryFn: getMovieNowPlaying,
      staleTime: 5 * 60 * 1000, // 5 menit
      gcTime: 30 * 60 * 1000, // 30 menit
  });
  const resultMovieNowplaying = queryMovieNowplaying?.data?.results || [];

  const moviesToday = resultMovieNowplaying.filter(
    movie => movie.release_date === today,
  );

  const isLoadingMovieNowplaying = queryMovieNowplaying.isLoading;

  const onRefetchMovieNowplaying = () => {
    return queryMovieNowplaying.refetch();
  };

  return {
    moviesToday,
    resultMovieNowplaying,
    isLoadingMovieNowplaying,
    onRefetchMovieNowplaying,
  };
}

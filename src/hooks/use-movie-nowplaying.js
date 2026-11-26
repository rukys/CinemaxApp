import { useQuery } from 'react-query';
import { getMovieNowPlaying } from '../services/root-api';
import { getLocalDateString } from '../utils';

export default function useMovieNowplaying(params = '') {
  const today = getLocalDateString();

  const queryMovieNowplaying = useQuery(
    ['get-movie-nowplaying', { countryCode: params }],
    getMovieNowPlaying,
    {
      staleTime: 5 * 60 * 1000, // 5 menit
      cacheTime: 30 * 60 * 1000, // 30 menit
    },
  );
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

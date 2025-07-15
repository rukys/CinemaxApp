import { useQuery } from 'react-query';
import { getMovieNowPlaying } from '../services/root-api';

export default function useMovieNowplaying() {
  // const today = new Date('2025-06-11').toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];

  const queryMovieNowplaying = useQuery(
    ['get-movie-nowplaying'],
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

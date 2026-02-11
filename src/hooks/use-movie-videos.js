import { useQuery } from 'react-query';
import { getMovieDetailVideos } from '../services/root-api';

export default function useMovieVideos(params = '') {
  const queryMovieVideos = useQuery(
    ['get-movie-videos', { movie_id: params }],
    getMovieDetailVideos,
    {
      enabled: !!params, // hanya fetch kalau params ada
      staleTime: 5 * 60 * 1000, // 5 menit
      cacheTime: 30 * 60 * 1000, // 30 menit
    },
  );

  const resultMovieVideos = queryMovieVideos?.data?.results || [];
  const isLoadingMovieVideos = queryMovieVideos.isLoading;
  const isErrorMovieVideos = queryMovieVideos.isError;

  // Helper function untuk filter & map videos
  const getVideoThumbnails = () => {
    // Validasi array kosong
    if (!resultMovieVideos || resultMovieVideos.length === 0) {
      return [];
    }

    const filtered = resultMovieVideos
      .filter(
        video =>
          video?.key && // validasi key ada (penting!)
          video?.site === 'YouTube' && // pastikan YouTube
          (video.type === 'Trailer' || video.type === 'Teaser') &&
          video.official === true,
      )
      .map(video => ({
        name: video.name,
        type: video.type,
        thumbnailUrl: `https://img.youtube.com/vi/${video.key}/sddefault.jpg`,
        videoUrl: `https://www.youtube.com/watch?v=${video.key}`,
        videoKey: video.key,
      }));

    // Fallback: kalau ga ada trailer/teaser, ambil video pertama yang valid
    if (filtered.length === 0) {
      const fallbackVideo = resultMovieVideos.find(
        v => v?.key && v?.site === 'YouTube',
      );

      if (fallbackVideo) {
        return [
          {
            name: fallbackVideo.name,
            type: fallbackVideo.type,
            thumbnailUrl: `https://img.youtube.com/vi/${fallbackVideo.key}/sddefault.jpg`,
            videoUrl: `https://www.youtube.com/watch?v=${fallbackVideo.key}`,
            videoKey: fallbackVideo.key,
          },
        ];
      }
    }

    return filtered;
  };

  const videoThumbnails = getVideoThumbnails();

  const onRefetchMovieVideos = () => {
    return queryMovieVideos.refetch();
  };

  return {
    resultMovieVideos,
    isLoadingMovieVideos,
    isErrorMovieVideos,
    videoThumbnails,
    hasVideos: videoThumbnails.length > 0,
    onRefetchMovieVideos,
  };
}

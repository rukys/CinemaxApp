import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetailVideos } from '../services/root-api';
import type { Video, VideoThumbnail } from '../types/tmdb';
import { MOVIE_QUERY_OPTIONS, movieKeys } from './query-keys';

const toThumbnail = (video: Video): VideoThumbnail => ({
  name: video.name,
  type: video.type,
  thumbnailUrl: `https://img.youtube.com/vi/${video.key}/sddefault.jpg`,
  videoUrl: `https://www.youtube.com/watch?v=${video.key}`,
  videoKey: video.key,
});

const isYouTube = (video: Video) => Boolean(video?.key) && video?.site === 'YouTube';

// Official YouTube trailers/teasers. Falls back to the first YouTube video
// when there is no official trailer or teaser.
export const selectVideoThumbnails = (videos: Video[]): VideoThumbnail[] => {
  const trailers = videos.filter(
    video =>
      isYouTube(video) &&
      (video.type === 'Trailer' || video.type === 'Teaser') &&
      video.official === true,
  );
  if (trailers.length > 0) {
    return trailers.map(toThumbnail);
  }
  const fallback = videos.find(isYouTube);
  return fallback ? [toThumbnail(fallback)] : [];
};

export default function useMovieVideos(movieId?: number) {
  const id = movieId ?? 0;
  const query = useQuery({
    queryKey: movieKeys.videos(id),
    queryFn: () => getMovieDetailVideos(id),
    enabled: Boolean(movieId),
    ...MOVIE_QUERY_OPTIONS,
  });

  const videoThumbnails = useMemo(
    () => selectVideoThumbnails(query.data?.results ?? []),
    [query.data],
  );

  return {
    videoThumbnails,
    hasVideos: videoThumbnails.length > 0,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}

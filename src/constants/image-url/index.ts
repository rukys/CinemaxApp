const IMG_API_HOST = 'https://image.tmdb.org/t/p/';

type ImagePath = string | null | undefined;

export const ImageCard = (path: ImagePath = '') => `${IMG_API_HOST}w185${path ?? ''}`;
export const ImagePoster = (path: ImagePath = '') =>
  `${IMG_API_HOST}w342${path ?? ''}`;
export const ImageBackdrop = (path: ImagePath = '') =>
  `${IMG_API_HOST}w500${path ?? ''}`;

export const ImageCastAndCrew = (path: ImagePath = '') =>
  `${IMG_API_HOST}original/${path ?? ''}`;

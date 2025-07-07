// import { IMG_API_HOST } from '../../config';

const IMG_API_HOST = 'https://image.tmdb.org/t/p/';

export const ImageCard = (path = '') => `${IMG_API_HOST}w185${path}`;
export const ImagePoster = (path = '') => `${IMG_API_HOST}w342${path}`;
export const ImageBackdrop = (path = '') => `${IMG_API_HOST}w500${path}`;

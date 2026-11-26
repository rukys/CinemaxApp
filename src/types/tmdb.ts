// Shapes taken from real TMDB v3 responses (movie/popular, movie/{id},
// movie/{id}/credits, movie/{id}/videos, genre/movie/list).
// Image paths are nullable: TMDB returns null when no image exists.

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreListResponse {
  genres: Genre[];
}

/** Movie item returned by list endpoints (popular, upcoming, search, ...). */
export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

/** Full movie returned by movie/{id}. */
export interface MovieDetail
  extends Omit<Movie, 'genre_ids'> {
  belongs_to_collection: unknown | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string | null;
  origin_country: string[];
  production_companies: ProductionCompany[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string;
}

interface CreditPerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
}

export interface CastMember extends CreditPerson {
  cast_id: number;
  character: string;
  order: number;
}

export interface CrewMember extends CreditPerson {
  department: string;
  job: string;
}

export interface CreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface VideosResponse {
  id: number;
  results: Video[];
}

/** Trailer/teaser prepared for the thumbnail list in movie detail. */
export interface VideoThumbnail {
  name: string;
  type: string;
  thumbnailUrl: string;
  videoUrl: string;
  videoKey: string;
}

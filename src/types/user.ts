/** Profile document stored in Firestore at users/{uid}. */
export interface UserProfile {
  id: string;
  fullName: string;
  email: string | null;
  photo: string | null;
  phoneNumber: string | null;
  /** ISO 3166-1 alpha-2 code used as the TMDB `region`, e.g. "ID". */
  countryCode?: string;
}

/**
 * Favorite movie stored in Firestore at users/{uid}/favorite/{movieId}.
 * Numbers and arrays are stored as strings for backward compatibility with
 * existing documents.
 */
export interface FavoriteMovie {
  id: string;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  /** vote_average as a string, e.g. "7.4". */
  rated: string;
  /** JSON array of genre ids, e.g. "[18,53]". */
  genres: string;
}

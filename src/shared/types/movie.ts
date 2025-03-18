import type { CreditCast, CreditCrew } from './credit';
import type { GenreMovie } from './genre';
import type { PaginationWithResults } from './pagination';
import type { ProductionCompany, ProductionCountry } from './production';

export type MovieGeneral = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieForList = MovieGeneral & {
  genre_ids: number[];
};

export type MovieSpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MovieBelongsToCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export type MovieDetail = MovieGeneral & {
  belongs_to_collection: MovieBelongsToCollection;
  budget: number;
  genres: GenreMovie[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: MovieSpokenLanguage[];
  status: string;
  tagline: string;
};

export type MovieRecommendationResponse = PaginationWithResults<MovieForList>;

export type MovieReview = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

export type MovieReviewResponse = PaginationWithResults<MovieReview>;

export type MovieDates = {
  maximum: string;
  minimum: string;
};

export type MovieListResponse = MovieDates &
  PaginationWithResults<MovieForList>;

export type MovieCreditResponse = {
  id: number;
  cast: CreditCast[];
  crew: CreditCrew[];
};

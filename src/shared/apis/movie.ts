import type { AxiosRequestConfig } from 'axios';

import { apiTMDBService } from '#/services/tmdb-service';
import {
  MovieCreditResponse,
  type MovieDetail,
  type MovieListResponse,
  type MovieRecommendationResponse,
  type MovieReviewResponse,
} from '#/types/movie';

export async function fetchMovieList(
  category: string,
  config: AxiosRequestConfig,
) {
  const { data } = await apiTMDBService.get<MovieListResponse>(
    `/movie/${category}`,
    config,
  );

  return data;
}

export async function fetchMovie(id: number) {
  const { data } = await apiTMDBService.get<MovieDetail>(`/movie/${id}`);

  return data;
}

export async function fetchMovieReviews(id: number) {
  const { data } = await apiTMDBService.get<MovieReviewResponse>(
    `/movie/${id}/reviews`,
  );

  return data;
}

export async function fetchMovieRecommendations(id: number) {
  const { data } = await apiTMDBService.get<MovieRecommendationResponse>(
    `/movie/${id}/recommendations`,
  );

  return data;
}

export async function fetchMovieCredits(id: number) {
  const { data } = await apiTMDBService.get<MovieCreditResponse>(
    `/movie/${id}/credits`,
  );

  return data;
}

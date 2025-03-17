import { apiTMDBService } from '#/services/tmdb-service';
import type {
  MovieDetail,
  MovieListResponse,
  MovieRecommendationResponse,
  MovieReviewResponse,
} from '#/types/movie';

export async function fetchMovieList(category: string) {
  const { data } = await apiTMDBService.get<MovieListResponse>(
    `/movie/${category}`,
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

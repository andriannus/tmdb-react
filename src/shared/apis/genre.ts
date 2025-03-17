import type { AxiosRequestConfig } from 'axios';

import { apiTMDBService } from '#/services/tmdb-service';
import type { GenreMovieResponse } from '#/types/genre';

export async function fetchGenres(config: AxiosRequestConfig) {
  const { data } = await apiTMDBService.get<GenreMovieResponse>(
    '/genre/movie/list',
    config,
  );

  return data;
}

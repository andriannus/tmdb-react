import type { AxiosRequestConfig } from 'axios';

import { apiTMDBService } from '#/services/tmdb-service';
import type { SearchMovieResponse } from '#/types/search';

export async function searchMovie(config: AxiosRequestConfig) {
  const { data } = await apiTMDBService.get<SearchMovieResponse>(
    '/search/movie',
    config,
  );

  return data;
}

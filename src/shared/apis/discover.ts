import type { AxiosRequestConfig } from 'axios';

import { apiTMDBService } from '#/services/tmdb-service';
import type { DiscoverResponse } from '#/types/discover';

export async function fetchDiscover(config: AxiosRequestConfig) {
  const { data } = await apiTMDBService.get<DiscoverResponse>(
    '/discover/movie',
    config,
  );

  return data;
}

import { Option } from '#/types/utility';

import { MovieCategory } from './enums';

export const CATEGORIES: Option<MovieCategory>[] = [
  { label: 'Now Playing', value: MovieCategory.NowPlaying },
  { label: 'Popular', value: MovieCategory.Popular },
  { label: 'Top Rated', value: MovieCategory.TopRated },
  { label: 'Upcoming', value: MovieCategory.Upcoming },
];

import { useQuery } from '@tanstack/react-query';

import { fetchGenres } from '#/apis/genre';
import { printString } from '#/utils/string';

export function useGenre() {
  const queryGenre = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    staleTime: Infinity,
  });

  const getMovieGenre = (id: number) => {
    const genre = queryGenre.data?.genres.find((genre) => genre.id === id);
    return printString(genre?.name);
  };

  return { getMovieGenre, queryGenre };
}

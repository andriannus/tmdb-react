import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { lazy } from 'react';

import { AppBox } from '#/components/app-box';
import { AppInfo } from '#/components/app-info';
import type { PaginationWithResults } from '#/types/pagination';
import type { MovieForList } from '#/types/movie';

const LoadMore = lazy(() =>
  import('../load-more').then((module) => ({ default: module.LoadMore })),
);

const MovieCard = lazy(() =>
  import('../movie-card').then((module) => ({ default: module.MovieCard })),
);

type InfiniteMoviesProps = {
  queryInfinite: Partial<
    UseInfiniteQueryResult<
      InfiniteData<PaginationWithResults<MovieForList>, unknown>,
      Error
    >
  >;
};

function InfiniteMovies({ queryInfinite }: InfiniteMoviesProps) {
  if (queryInfinite.isFetching && !queryInfinite.isFetchingNextPage) {
    return (
      <AppBox className="mt-4">
        <AppInfo>Loading...</AppInfo>
      </AppBox>
    );
  }

  if (!queryInfinite.data?.pages[0].results.length) {
    return (
      <AppBox className="mt-4">
        <AppInfo>No data</AppInfo>
      </AppBox>
    );
  }

  return (
    <AppBox>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {queryInfinite.data?.pages.map((page) => {
          return page.results.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          });
        })}
      </div>

      {queryInfinite.isFetchingNextPage && (
        <AppInfo className="border border-transparent mt-4">Loading...</AppInfo>
      )}

      {!queryInfinite.isFetchingNextPage && queryInfinite.hasNextPage && (
        <LoadMore
          onClick={() => {
            queryInfinite.fetchNextPage?.();
          }}
        />
      )}
    </AppBox>
  );
}

export default InfiniteMovies;

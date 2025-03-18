import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { fetchMovieList } from '#/apis/movie';
import { AppBar } from '#/components/app-bar';
import { AppBarTitle } from '#/components/app-bar/app-bar-title';
import { AppBox } from '#/components/app-box';
import { AppTag } from '#/components/app-tag';

import { CATEGORIES } from './shared/constants';
import { MovieCategory } from './shared/enums';
import { LoadMore } from './shared/load-more';
import { MovieCard } from './shared/movie-card';

import styles from './movies.module.css';

function Movies() {
  const [movieCategory, setMovieCategory] = useState(MovieCategory.NowPlaying);

  const queryMovieList = useInfiniteQuery({
    queryKey: ['movie-list', movieCategory],
    queryFn: ({ pageParam }) => {
      return fetchMovieList(movieCategory, {
        params: {
          page: pageParam,
        },
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  return (
    <>
      <AppBar>
        <AppBarTitle brand>TMDB React</AppBarTitle>
      </AppBar>

      <main>
        <AppBox className="mb-4">
          <div className={styles['Movies-categories']}>
            {CATEGORIES.map((category) => {
              return (
                <AppTag
                  key={category.value}
                  active={category.value === movieCategory}
                  onClick={() => {
                    setMovieCategory(category.value);
                  }}
                >
                  {category.label}
                </AppTag>
              );
            })}
          </div>
        </AppBox>

        {queryMovieList.isFetching && !queryMovieList.isFetchingNextPage ? (
          <AppBox>
            <div className="mt-4 border border-transparent text-center">
              <span className="text-xs">Loading...</span>
            </div>
          </AppBox>
        ) : (
          <>
            {!queryMovieList.data?.pages[0].results.length && (
              <AppBox>
                <div className="mt-4 border border-transparent text-center">
                  <span className="text-xs">No data</span>
                </div>
              </AppBox>
            )}

            {!!queryMovieList.data?.pages[0].results.length && (
              <AppBox className="lg:mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {queryMovieList.data?.pages.map((page) => {
                    return page.results.map((movie) => {
                      return <MovieCard key={movie.id} movie={movie} />;
                    });
                  })}
                </div>

                {queryMovieList.isFetchingNextPage && (
                  <div className="mt-4 border border-transparent text-center">
                    <span className="text-xs">Loading...</span>
                  </div>
                )}

                {!queryMovieList.isFetchingNextPage &&
                  queryMovieList.hasNextPage && (
                    <LoadMore onClick={queryMovieList.fetchNextPage} />
                  )}
              </AppBox>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default Movies;

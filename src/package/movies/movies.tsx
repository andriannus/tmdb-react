import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { fetchMovieList } from '#/apis/movie';
import { AppBar } from '#/components/app-bar';
import { AppBarTitle } from '#/components/app-bar/app-bar-title';
import { AppBox } from '#/components/app-box';
import { AppTag } from '#/components/app-tag';

import { CATEGORIES } from './shared/constants';
import { MovieCategory } from './shared/enums';
import { InfiniteMovies } from './shared/infinite-movies';

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
      <AppBar showSearch>
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

        <InfiniteMovies queryInfinite={queryMovieList} />
      </main>
    </>
  );
}

export default Movies;

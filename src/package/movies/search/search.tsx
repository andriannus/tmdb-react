import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { searchMovie } from '#/apis/search';
import { AppBar } from '#/components/app-bar';
import { AppBarBackButton } from '#/components/app-bar/app-bar-back-button';
import { AppBarTitle } from '#/components/app-bar/app-bar-title';
import { AppBox } from '#/components/app-box';
import useDebounce from '#/hooks/use-debounce';

import { InfiniteMovies } from '../shared/infinite-movies';

import styles from './search.module.css';

function Search() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const querySearchMovieList = useInfiniteQuery({
    queryKey: ['search-movie-list', debouncedSearch],
    queryFn: ({ pageParam }) => {
      return searchMovie({
        params: {
          page: pageParam,
          query: debouncedSearch,
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
        <AppBarBackButton to="/" />
        <AppBarTitle>Search</AppBarTitle>
      </AppBar>

      <main>
        <AppBox>
          <div className={styles['SearchField']}>
            <FontAwesomeIcon
              className={styles['SearchField-icon']}
              icon={faSearch}
              fixedWidth
            />

            <input
              className={styles['SearchField-input']}
              placeholder="Search here..."
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </AppBox>

        <InfiniteMovies queryInfinite={querySearchMovieList} />
      </main>
    </>
  );
}

export default Search;

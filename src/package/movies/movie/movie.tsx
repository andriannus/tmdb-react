import { useQuery } from '@tanstack/react-query';
import cc from 'classcat';
import { lazy } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMovie } from '#/apis/movie';
import { AppBar } from '#/components/app-bar';
import { AppBarBackButton } from '#/components/app-bar/app-bar-back-button';
import { AppBox } from '#/components/app-box';
import { AppInfo } from '#/components/app-info';
import { TMDB_IMAGE_BASE_URL } from '#/constants/movie';
import { getYear } from '#/utils/date';

import styles from './movie.module.css';

const MovieCredit = lazy(() =>
  import('../shared/movie-credit').then((module) => ({
    default: module.MovieCredit,
  })),
);

function Movie() {
  const { id } = useParams<{ id: string }>();

  const queryMovie = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovie(parseInt(id as string)),
    enabled: !!id,
  });

  const genres = (() => {
    if (!queryMovie.data) return '';
    return queryMovie.data.genres.map((genre) => genre.name).join(', ');
  })();

  return (
    <>
      <AppBar>
        <AppBarBackButton to="/" />
      </AppBar>

      <main>
        {queryMovie.isFetching && (
          <AppBox>
            <AppInfo>Loading...</AppInfo>
          </AppBox>
        )}

        {!queryMovie.isFetching && (
          <AppBox
            style={{
              backgroundImage: queryMovie.data?.backdrop_path
                ? `url(${TMDB_IMAGE_BASE_URL}/original/${queryMovie.data?.backdrop_path})`
                : 'none',
            }}
            className={styles['Movie-backdrop']}
          >
            <div className="grid grid-cols-12 gap-4 relative z-10">
              <div
                className={cc([
                  'col-span-12',
                  'sm:col-span-4',
                  styles['Movie-poster'],
                ])}
              >
                {queryMovie.data?.poster_path && (
                  <img
                    src={`${TMDB_IMAGE_BASE_URL}/w300/${queryMovie.data?.poster_path}`}
                    alt={queryMovie.data?.title}
                    className={styles['Movie-img']}
                  />
                )}
              </div>

              <div className="col-span-12 sm:col-span-8">
                <span>{getYear(queryMovie.data?.release_date)}</span>

                <h1 className={styles['Movie-title']}>
                  {queryMovie.data?.title}
                </h1>

                <span className={styles['Movie-genres']}>{genres}</span>

                <span className={styles['Movie-subtitle']}>Overview</span>

                <p className={styles['Movie-overview']}>
                  {queryMovie.data?.overview}
                </p>
              </div>
            </div>
          </AppBox>
        )}

        {id && <MovieCredit movieID={parseInt(id)} />}
      </main>
    </>
  );
}

export default Movie;

import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';

import { fetchMovieCredits } from '#/apis/movie';
import { AppBox } from '#/components/app-box';
import { AppInfo } from '#/components/app-info';

import styles from './movie-credit.module.css';

const CreditList = lazy(() =>
  import('../credit-list').then((module) => ({
    default: module.CreditList,
  })),
);

type MovieCreditProps = {
  movieID: number;
};

function MovieCredit({ movieID }: MovieCreditProps) {
  const queryCredit = useQuery({
    queryKey: ['movie-credit', movieID],
    queryFn: () => fetchMovieCredits(movieID),
  });

  const director = (() => {
    if (!queryCredit.data) return [];

    return queryCredit.data.crew
      .filter((crew) => crew.job === 'Director')
      .map((crew) => {
        return {
          id: crew.id,
          title: crew.name,
          subtitle: crew.job,
          profile_path: crew.profile_path,
        };
      });
  })();

  const cast = (() => {
    if (!queryCredit.data) return [];

    return queryCredit.data.cast.slice(0, 10).map((cast) => {
      return {
        id: cast.id,
        title: cast.name,
        subtitle: cast.character,
        profile_path: cast.profile_path,
      };
    });
  })();

  if (queryCredit.isFetching) {
    return (
      <AppBox className="mt-4">
        <AppInfo>Loading...</AppInfo>
      </AppBox>
    );
  }

  return (
    <>
      <AppBox className="mt-4">
        <span className={styles['MovieCredit-title']}>Directing</span>

        {director.length === 0 ? (
          <AppInfo>No data</AppInfo>
        ) : (
          <CreditList value={director} />
        )}
      </AppBox>

      <AppBox className="mt-4">
        <span className={styles['MovieCredit-title']}>Cast</span>

        {cast.length === 0 ? (
          <AppInfo>No data</AppInfo>
        ) : (
          <CreditList value={cast} />
        )}
      </AppBox>
    </>
  );
}

export default MovieCredit;

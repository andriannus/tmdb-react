import { useQuery } from '@tanstack/react-query';

import { fetchMovieCredits } from '#/apis/movie';
import { AppBox } from '#/components/app-box';
import { AppInfo } from '#/components/app-info';
import { TMDB_IMAGE_BASE_URL } from '#/constants/movie';

import styles from './movie-credit.module.css';

type MovieCreditProps = {
  movieID: number;
};

function MovieCredit({ movieID }: MovieCreditProps) {
  const queryCredit = useQuery({
    queryKey: ['movie-credit', movieID],
    queryFn: () => fetchMovieCredits(movieID),
  });

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

        {queryCredit.data?.crew.length === 0 ? (
          <AppInfo>No data</AppInfo>
        ) : (
          <div className={styles['MovieCredit-list']}>
            {queryCredit.data?.crew
              .filter((crew) => crew.department === 'Directing')
              .map((crew) => (
                <div key={crew.id} className={styles['MovieCredit-listItem']}>
                  <div className={styles['MovieCredit-photo']}>
                    {crew.profile_path && (
                      <img
                        src={`${TMDB_IMAGE_BASE_URL}/w200/${crew.profile_path}`}
                        alt={crew.name}
                        className={styles['MovieCredit-img']}
                      />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-semibold">{crew.name}</span>
                    <span className="text-sm text-gray-400">{crew.job}</span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </AppBox>

      <AppBox className="mt-4">
        <span className={styles['MovieCredit-title']}>Cast</span>

        {queryCredit.data?.cast.length === 0 ? (
          <AppInfo>No data</AppInfo>
        ) : (
          <div className={styles['MovieCredit-list']}>
            {queryCredit.data?.cast.map((crew) => (
              <div key={crew.id} className={styles['MovieCredit-listItem']}>
                <div className={styles['MovieCredit-photo']}>
                  {crew.profile_path && (
                    <img
                      src={`${TMDB_IMAGE_BASE_URL}/w200/${crew.profile_path}`}
                      alt={crew.name}
                      className={styles['MovieCredit-img']}
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold">{crew.name}</span>
                  <span className="text-sm text-gray-400">
                    {crew.character}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </AppBox>
    </>
  );
}

export default MovieCredit;

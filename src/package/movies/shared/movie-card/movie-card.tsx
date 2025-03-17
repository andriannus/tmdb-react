import { MovieForList } from '#/types/movie';
import { transformToReviewDate } from '#/utils/date';

import styles from './movie-card.module.css';

type MovieCardProps = {
  movie: MovieForList;
};

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className={styles.MovieCard}>
      <div className={styles['MovieCard-poster']}>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
            className={styles['MovieCard-img']}
            loading="lazy"
          />
        )}
      </div>

      <span className={styles['MovieCard-title']}>{movie.title}</span>

      <span className={styles['MovieCard-date']}>
        {transformToReviewDate(movie.release_date)}
      </span>
    </div>
  );
}

export default MovieCard;

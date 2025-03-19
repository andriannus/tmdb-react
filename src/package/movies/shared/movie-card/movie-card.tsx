import { Link } from 'react-router-dom';

import { TMDB_IMAGE_BASE_URL } from '#/constants/movie';
import { MovieForList } from '#/types/movie';
import { transformToReviewDate } from '#/utils/date';

import styles from './movie-card.module.css';

type MovieCardProps = {
  movie: MovieForList;
};

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link className={styles.MovieCard} to={`/movies/${movie.id}`}>
      <div className={styles['MovieCard-poster']}>
        {movie.poster_path && (
          <img
            src={`${TMDB_IMAGE_BASE_URL}/w200${movie.poster_path}`}
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
    </Link>
  );
}

export default MovieCard;

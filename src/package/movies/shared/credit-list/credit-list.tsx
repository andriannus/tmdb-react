import { TMDB_IMAGE_BASE_URL } from '#/constants/movie';

import styles from './credit-list.module.css';

type CreditListProps = {
  value: {
    id: number;
    profile_path: string;
    subtitle: string;
    title: string;
  }[];
};

function CreditList({ value }: CreditListProps) {
  return (
    <div className={styles['CreditList']}>
      {value.map((crew) => (
        <div key={crew.id} className={styles['CreditList-item']}>
          <div className={styles['CreditList-photo']}>
            {crew.profile_path && (
              <img
                src={`${TMDB_IMAGE_BASE_URL}/w200${crew.profile_path}`}
                alt={crew.title}
                className={styles['CreditList-img']}
                loading="lazy"
              />
            )}
          </div>

          <div className="flex flex-col">
            <span className="font-semibold">{crew.title}</span>
            <span className="text-sm text-gray-400">{crew.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CreditList;

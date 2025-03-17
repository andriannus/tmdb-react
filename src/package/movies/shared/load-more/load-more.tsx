import styles from './load-more.module.css';

type LoadMoreProps = {
  onClick: () => void;
};

function LoadMore({ onClick }: LoadMoreProps) {
  return (
    <div className={styles.LoadMore}>
      <button className={styles['LoadMore-button']} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}

export default LoadMore;

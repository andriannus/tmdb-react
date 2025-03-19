import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import styles from './app-bar.module.css';

type AppBarProps = PropsWithChildren<{
  showSearch?: boolean;
}>;

function AppBar({ children, showSearch = false }: AppBarProps) {
  return (
    <header data-testid="AppBar" className={styles.AppBar}>
      {children}

      {showSearch && (
        <Link
          data-testid="BtnAppBarSearch"
          className={styles['AppBar-button']}
          to="/search"
        >
          <FontAwesomeIcon icon={faSearch} fixedWidth />
        </Link>
      )}
    </header>
  );
}

export default AppBar;

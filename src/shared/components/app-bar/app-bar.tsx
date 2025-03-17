import type { PropsWithChildren } from 'react';

import styles from './app-bar.module.css';

function AppBar({ children }: PropsWithChildren) {
  return <header className={styles.AppBar}>{children}</header>;
}

export default AppBar;

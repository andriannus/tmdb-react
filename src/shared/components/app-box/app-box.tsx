import type { PropsWithChildren } from 'react';

import styles from './app-box.module.css';

function AppBox({ children }: PropsWithChildren) {
  return <div className={styles.AppBox}>{children}</div>;
}

export default AppBox;

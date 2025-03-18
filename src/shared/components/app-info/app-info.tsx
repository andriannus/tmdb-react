import cc from 'classcat';
import type { HTMLAttributes, PropsWithChildren } from 'react';

import styles from './app-info.module.css';

type AppInfoProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

function AppInfo({ children, className, ...props }: AppInfoProps) {
  return (
    <div className={cc([styles.AppInfo, className])} {...props}>
      <span className={styles['AppInfo-text']}>{children}</span>
    </div>
  );
}

export default AppInfo;

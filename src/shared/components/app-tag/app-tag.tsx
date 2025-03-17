import type { PropsWithChildren } from 'react';

import styles from './app-tag.module.css';
import cc from 'classcat';

type AppTagProps = PropsWithChildren<{
  active?: boolean;
}>;

function AppTag({ active, children }: AppTagProps) {
  return (
    <span
      className={cc([
        {
          [styles['AppTag--active']]: active,
        },
        styles.AppTag,
      ])}
    >
      {children}
    </span>
  );
}

export default AppTag;

import cc from 'classcat';
import type { PropsWithChildren } from 'react';

import styles from './app-bar-title.module.css';

type AppBarTitleProps = PropsWithChildren<{
  brand?: boolean;
}>;

function AppBarTitle({ children, brand = false }: AppBarTitleProps) {
  return (
    <h1
      className={cc([
        {
          [styles['AppBar-title--isBrand']]: brand,
        },
        styles['AppBar-title'],
      ])}
    >
      {children}
    </h1>
  );
}

export default AppBarTitle;

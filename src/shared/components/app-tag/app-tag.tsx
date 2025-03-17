import cc from 'classcat';
import type { HTMLAttributes, PropsWithChildren } from 'react';

import styles from './app-tag.module.css';

type AppTagProps = PropsWithChildren<
  {
    active?: boolean;
  } & HTMLAttributes<HTMLSpanElement>
>;

function AppTag({ active, children, className, ...props }: AppTagProps) {
  return (
    <span
      className={cc([
        {
          [styles['AppTag--active']]: active,
        },
        styles.AppTag,
        className,
      ])}
      {...props}
    >
      {children}
    </span>
  );
}

export default AppTag;

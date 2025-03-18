import cc from 'classcat';
import type { HTMLAttributes, PropsWithChildren } from 'react';

import styles from './app-box.module.css';

type AppBoxProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

function AppBox({ children, className, ...props }: AppBoxProps) {
  return (
    <div className={cc([styles.AppBox, className])} {...props}>
      {children}
    </div>
  );
}

export default AppBox;

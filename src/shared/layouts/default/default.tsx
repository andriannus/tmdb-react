import { Outlet } from 'react-router-dom';

import styles from './default.module.css';

function LayoutDefault() {
  return (
    <div className={styles.LayoutDefault}>
      <Outlet />
    </div>
  );
}

export default LayoutDefault;

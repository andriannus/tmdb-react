import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

import styles from './app-bar-back-button.module.css';

type AppBarBackButtonProps = {
  disabled: boolean;
  replace: boolean;
  to: string;
};

function AppBarBackButton({
  disabled,
  replace,
  to,
}: Partial<AppBarBackButtonProps>) {
  const navigate = useNavigate();

  if (to) {
    return (
      <Link
        id="BtnAppBarBack"
        aria-label="Back"
        className={styles['AppBar-backButton']}
        replace={replace}
        role="button"
        to={to}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
    );
  }

  return (
    <button
      id="BtnAppBarBack"
      aria-label="Back"
      className={styles['AppBar-backButton']}
      disabled={disabled}
      onClick={() => {
        navigate(-1);
      }}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
}

export default AppBarBackButton;

import { AppBar } from '#/components/app-bar';
import { AppBarTitle } from '#/components/app-bar/app-bar-title';
import { AppBox } from '#/components/app-box';
import { AppTag } from '#/components/app-tag';

import { CATEGORIES } from './shared/constants';

import styles from './discover.module.css';

function Discover() {
  return (
    <>
      <AppBar>
        <AppBarTitle brand>TMDB React</AppBarTitle>
      </AppBar>

      <main>
        <AppBox>
          <div className={styles['Discover-categories']}>
            {CATEGORIES.map((category) => {
              return <AppTag key={category.value}>{category.label}</AppTag>;
            })}
          </div>
        </AppBox>
      </main>
    </>
  );
}

export default Discover;

import { AppBar } from '#/components/app-bar';
import { AppBarBackButton } from '#/components/app-bar/app-bar-back-button';
import { AppBarTitle } from '#/components/app-bar/app-bar-title';

function Movie() {
  return (
    <>
      <AppBar>
        <AppBarBackButton to="/" />
        <AppBarTitle>Movie</AppBarTitle>
      </AppBar>
    </>
  );
}

export default Movie;

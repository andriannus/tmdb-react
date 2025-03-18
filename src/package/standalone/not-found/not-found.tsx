import { AppBar } from '#/components/app-bar';
import { AppBarBackButton } from '#/components/app-bar/app-bar-back-button';
import { AppBarTitle } from '#/components/app-bar/app-bar-title';

function NotFound() {
  return (
    <>
      <AppBar showSearch>
        <AppBarBackButton to="/" />
        <AppBarTitle>Ops.</AppBarTitle>
      </AppBar>

      <main>
        <p className="text-center">You are lost. Let's go back.</p>
      </main>
    </>
  );
}

export default NotFound;

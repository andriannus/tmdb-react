import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const StandalonePageHome = lazy(() =>
  import('./package/standalone/pages/home').then((module) => ({
    default: module.StandalonePageHome,
  })),
);

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StandalonePageHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

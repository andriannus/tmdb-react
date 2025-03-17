import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Discover = lazy(() =>
  import('./package/discover').then((module) => ({ default: module.Discover })),
);

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Discover />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

import { LayoutDefault } from '#/layouts/default';
import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const Discover = lazy(() =>
  import('./package/discover').then((module) => ({ default: module.Discover })),
);

const Movie = lazy(() =>
  import('./package/discover/movie').then((module) => ({
    default: module.Movie,
  })),
);

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route index element={<Discover />} />

          <Route path="movie">
            <Route index element={<Navigate to="/" replace />} />
            <Route path=":id" element={<Movie />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

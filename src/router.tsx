import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LayoutDefault } from '#/layouts/default';

const Movies = lazy(() =>
  import('./package/movies').then((module) => ({ default: module.Movies })),
);

const Movie = lazy(() =>
  import('./package/movies/movie').then((module) => ({
    default: module.Movie,
  })),
);

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route index element={<Navigate to="/movies" replace />} />

          <Route path="movies">
            <Route index element={<Movies />} />
            <Route path=":id" element={<Movie />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

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

const Search = lazy(() =>
  import('./package/movies/search').then((module) => ({
    default: module.Search,
  })),
);

const NotFound = lazy(() =>
  import('./package/standalone/not-found').then((module) => ({
    default: module.NotFound,
  })),
);

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/404" replace />} />

        <Route path="/" element={<LayoutDefault />}>
          <Route index element={<Navigate to="/movies" replace />} />

          <Route path="404" element={<NotFound />} />

          <Route path="movies">
            <Route index element={<Movies />} />
            <Route path=":id" element={<Movie />} />
          </Route>

          <Route path="search">
            <Route index element={<Search />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

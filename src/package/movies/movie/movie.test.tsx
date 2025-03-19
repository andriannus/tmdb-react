import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, afterEach, vi } from 'vitest';

import * as movieApi from '#/apis/movie';
import { MOCK_MOVIE_DETAIL } from '#/mocks/movie';

import Movie from './movie';

vi.mock('#/apis/movie', () => ({
  fetchMovie: vi.fn(),
}));

vi.mock('../shared/movie-credit', () => ({
  MovieCredit: ({ movieID }: { movieID: number }) => (
    <div data-testid="MovieCredit">Movie Credit {movieID}</div>
  ),
}));

const fetchMovieSpy = vi.spyOn(movieApi, 'fetchMovie');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const renderMovie = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/movie/123']}>
        <Routes>
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('Movie Component', () => {
  afterEach(() => {
    cleanup();
    queryClient.clear();
    vi.clearAllMocks();
  });

  it('should render AppBar with BackButton and title "Detail"', async () => {
    fetchMovieSpy.mockResolvedValue({
      adult: false,
      backdrop_path: '/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      belongs_to_collection: null,
      budget: 0,
      genres: [
        {
          id: 28,
          name: 'Action',
        },
        {
          id: 12,
          name: 'Adventure',
        },
        {
          id: 53,
          name: 'Thriller',
        },
      ],
      homepage: 'https://www.amazon.com/salp/aworkingman?hhf',
      id: 1197306,
      imdb_id: 'tt9150192',
      origin_country: ['GB', 'US'],
      original_language: 'en',
      original_title: 'A Working Man',
      overview:
        "Levon Cade left behind a decorated military career in the black ops to live a simple life working construction. But when his boss's daughter, who is like family to him, is taken by human traffickers, his search to bring her home uncovers a world of corruption far greater than he ever could have imagined.",
      popularity: 3.886,
      poster_path: '/6FRFIogh3zFnVWn7Z6zcYnIbRcX.jpg',
      production_companies: [
        {
          id: 118475,
          logo_path: '/x8mwqWGZK2gQvrp5QlYQho1VgXj.png',
          name: 'Cedar Park Entertainment',
          origin_country: 'US',
        },
        {
          id: 219295,
          logo_path: null,
          name: 'BlockFilm',
          origin_country: 'US',
        },
        {
          id: 218150,
          logo_path: null,
          name: 'Punch Palace Productions',
          origin_country: 'GB',
        },
        {
          id: 166120,
          logo_path: '/fRuHQF9DB4Zl3ha62D5Bpu1a5TL.png',
          name: 'Balboa Productions',
          origin_country: 'US',
        },
        {
          id: 22146,
          logo_path: '/v37N1mFeXNQfvPankg3feBhVvM7.png',
          name: 'Black Bear Pictures',
          origin_country: 'US',
        },
        {
          id: 181874,
          logo_path: '/crrgXvLhDO9c57HYrbO4H58Vxmb.png',
          name: 'Fifth Season',
          origin_country: 'US',
        },
        {
          id: 253169,
          logo_path: null,
          name: 'CAT5',
          origin_country: 'US',
        },
      ],
      production_countries: [
        {
          iso_3166_1: 'GB',
          name: 'United Kingdom',
        },
        {
          iso_3166_1: 'US',
          name: 'United States of America',
        },
      ],
      release_date: '2025-03-26',
      revenue: 0,
      runtime: 116,
      spoken_languages: [
        {
          english_name: 'English',
          iso_639_1: 'en',
          name: 'English',
        },
      ],
      status: 'In Production',
      tagline: 'Human traffickers beware.',
      title: 'A Working Man',
      video: false,
      vote_average: 0.0,
      vote_count: 0,
    });

    renderMovie();

    const appBar = screen.getByTestId('AppBar');
    expect(appBar).toBeTruthy();

    const appBarTitle = screen.getByTestId('AppBarTitle');
    expect(appBarTitle.textContent).toBe('Detail');
  });

  it('should display loading state when fetching data', async () => {
    fetchMovieSpy.mockReturnValue(new Promise(() => {}));

    renderMovie();

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeTruthy();
    });
  });

  it('should render movie details when data is loaded', async () => {
    fetchMovieSpy.mockResolvedValue(MOCK_MOVIE_DETAIL);

    renderMovie();

    const movieTitle = await screen.findByText(MOCK_MOVIE_DETAIL.title);
    expect(movieTitle).toBeTruthy();

    const releaseYear = screen.getByText('2025');
    expect(releaseYear).toBeTruthy();

    const genresText = screen.getByText('Action, Adventure, Thriller');
    expect(genresText).toBeTruthy();

    const overviewText = screen.getByText(MOCK_MOVIE_DETAIL.overview);
    expect(overviewText).toBeTruthy();

    const posterImage = screen.getByAltText(MOCK_MOVIE_DETAIL.title);
    expect(posterImage.getAttribute('src')).toContain(
      `https://image.tmdb.org/t/p/w300${MOCK_MOVIE_DETAIL.poster_path}`,
    );
  });

  it('should render MovieCredit component with correct movieID', async () => {
    fetchMovieSpy.mockResolvedValue(MOCK_MOVIE_DETAIL);

    renderMovie();

    const movieCredit = await screen.findByText('Movie Credit 123');
    expect(movieCredit).toBeTruthy();
  });
});

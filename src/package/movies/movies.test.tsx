import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import Movies from './movies';

vi.mock('#/components/app-bar', () => ({
  AppBar: ({
    children,
  }: {
    children: React.ReactNode;
    showSearch?: boolean;
  }) => <div data-testid="app-bar">{children}</div>,
}));

vi.mock('#/components/app-bar/app-bar-title', () => ({
  AppBarTitle: ({
    children,
  }: {
    children: React.ReactNode;
    brand?: boolean;
  }) => <h1 data-testid="app-bar-title">{children}</h1>,
}));

vi.mock('#/components/app-box', () => ({
  AppBox: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="app-box" className={className}>
      {children}
    </div>
  ),
}));

vi.mock('#/components/app-tag', () => ({
  AppTag: ({
    children,
    active,
    onClick,
  }: {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
  }) => (
    <button
      data-testid="app-tag"
      data-active={active ? 'true' : 'false'}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

vi.mock('./shared/infinite-movies', () => ({
  InfiniteMovies: () => (
    <div data-testid="infinite-movies">Infinite Movies</div>
  ),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Movies />
    </QueryClientProvider>,
  );

describe('Movies Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render AppBar correctly', () => {
    renderComponent();
    expect(screen.getByTestId('app-bar')).toBeTruthy();
  });

  it('should render AppBarTitle with text "TMDB React"', () => {
    renderComponent();
    const appBarTitle = screen.getByTestId('app-bar-title');
    expect(appBarTitle.textContent).toBe('TMDB React');
  });

  it('should render at least one category tag', () => {
    renderComponent();
    const categoryButtons = screen.getAllByTestId('app-tag');
    expect(categoryButtons.length).toBeGreaterThan(0);
  });

  it('should update active state of a category tag on click', async () => {
    renderComponent();
    const categoryButtons = screen.getAllByTestId('app-tag');
    const firstTag = categoryButtons[0];
    fireEvent.click(firstTag);
    await waitFor(() => {
      expect(firstTag.getAttribute('data-active')).toBe('true');
    });
  });

  it('should render InfiniteMovies component', () => {
    renderComponent();
    expect(screen.getByTestId('infinite-movies')).toBeTruthy();
  });
});

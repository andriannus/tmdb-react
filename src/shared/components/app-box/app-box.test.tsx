import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import AppBox from './app-box';

describe('AppBox Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render children correctly', () => {
    render(<AppBox>Test Content</AppBox>);
    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('should apply the default CSS module class from app-info.module.css', () => {
    const { container } = render(<AppBox>Content</AppBox>);
    const divElement = container.firstChild as HTMLElement;

    expect(divElement.className).toMatch(/AppBox/);
  });

  it('should merge additional className prop with the default class', () => {
    const { container } = render(
      <AppBox className="extra-class">Content</AppBox>,
    );
    const divElement = container.firstChild as HTMLElement;

    expect(divElement.className).toMatch(/extra-class/);
  });

  it('should spread additional props to the outer div', () => {
    render(<AppBox data-testid="appbox">Content</AppBox>);

    const divElement = screen.getByTestId('appbox');

    expect(divElement).toBeTruthy();
  });
});

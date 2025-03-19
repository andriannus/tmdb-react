import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import AppInfo from './app-info';

describe('AppInfo Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render children correctly', () => {
    render(<AppInfo>Test Content</AppInfo>);
    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('should apply the default CSS module class from app-info.module.css', () => {
    const { container } = render(<AppInfo>Content</AppInfo>);
    const divElement = container.firstChild as HTMLElement;

    expect(divElement.className).toMatch(/AppInfo/);
  });

  it('should merge additional className prop with the default class', () => {
    const { container } = render(
      <AppInfo className="extra-class">Content</AppInfo>,
    );
    const divElement = container.firstChild as HTMLElement;

    expect(divElement.className).toMatch(/extra-class/);
  });

  it('should spread additional props to the outer div', () => {
    const { container } = render(
      <AppInfo data-test="custom-value">Content</AppInfo>,
    );
    const divElement = container.firstChild as HTMLElement;

    expect(divElement.getAttribute('data-test')).toBe('custom-value');
  });
});

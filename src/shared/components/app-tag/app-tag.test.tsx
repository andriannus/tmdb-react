import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import AppTag from './app-tag';

describe('AppTag Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render children correctly', () => {
    render(<AppTag>Test Tag</AppTag>);
    expect(screen.getByText('Test Tag')).toBeTruthy();
  });

  it('should apply active style when active prop is true', () => {
    render(<AppTag active>Active Tag</AppTag>);
    const tagElement = screen.getByText('Active Tag');
    expect(tagElement.className).toMatch(/AppTag--active/);
  });

  it('should apply custom className when provided', () => {
    render(<AppTag className="custom-class">Custom Class</AppTag>);
    const tagElement = screen.getByText('Custom Class');
    expect(tagElement.className).toContain('custom-class');
  });
});

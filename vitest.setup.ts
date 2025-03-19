import { vi } from 'vitest';

vi.mock(
  '*.module.css',
  () =>
    new Proxy(
      {},
      {
        get: (_, className) => className,
      },
    ),
);

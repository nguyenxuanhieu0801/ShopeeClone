import { waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import { routes } from '~/constants';
import { access_token } from '~/msw/auth.msw';
import { setAccessTokenToLS } from '~/utils';
import { renderWithRouter } from '~/utils/testUtils';

describe('Profile', async () => {
  it('Hiện thị trang profile', async () => {
    setAccessTokenToLS(access_token);
    const { container } = renderWithRouter({ route: routes.profile });

    await waitFor(() => {
      expect((container.querySelector('form input[placeholder="Tên"]') as HTMLInputElement).value).toBe('Demo');
    });
  });
});

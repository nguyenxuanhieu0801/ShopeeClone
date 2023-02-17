import { describe, expect, test } from 'vitest';
import { delay, renderWithRouter } from '~/utils/testUtils';

describe('ProductDetail', () => {
  test('Render UI ProductDetail', async () => {
    renderWithRouter({ route: '/Điện-thoại-OPPO-A12-3GB32GB--Hàng-chính-hãng-i-60afb2426ef5b902180aacb9' });
    await delay(1000);
    expect(document.body).toMatchSnapshot();
  });
});

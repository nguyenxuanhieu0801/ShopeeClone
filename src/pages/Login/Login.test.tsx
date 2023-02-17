import matchers from '@testing-library/jest-dom/matchers';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import { routes } from '~/constants';
import { renderWithRouter } from '~/utils/testUtils';

expect.extend(matchers);

describe('Login', () => {
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  beforeAll(async () => {
    renderWithRouter({ route: routes.login });
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument();
    });
    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement;
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement;
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement;
  });

  it('Hiện thị lỗi required khi không nhập gì', async () => {
    fireEvent.submit(submitButton);
    await waitFor(() => {
      expect(screen.queryByText('Email là bắt buộc')).toBeTruthy();
      expect(screen.queryByText('Password là bắt buộc')).toBeTruthy();
    });
  });

  it('Hiện thị lỗi khi nhập value input sai', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'test@mail'
      }
    });
    fireEvent.change(passwordInput, {
      target: {
        value: '123'
      }
    });
    fireEvent.submit(submitButton);
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeTruthy();
      expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeTruthy();
    });
  });

  it('Không nên hiển thị lỗi khi nhập lại value đúng', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'demo123@gmail.com'
      }
    });
    fireEvent.change(passwordInput, {
      target: {
        value: '123456789'
      }
    });

    // Những trường hợp chứng minh rằng tìm không ra text hay là element
    // Thì nên dùng query hơn là find hay get
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy();
      expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeFalsy();
    });

    fireEvent.submit(submitButton);
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone');
    });
  });
});

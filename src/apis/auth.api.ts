import { AuthResponse } from '~/types';
import axiosClient from '~/utils/axiosClient';

export const URL_LOGIN = 'login';
export const URL_REGISTER = 'register';
export const URL_LOGOUT = 'logout';
export const URL_REFRESH_TOKEN = 'refresh-access-token';

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return axiosClient.post<AuthResponse>(URL_REGISTER, body);
  },
  login(body: { email: string; password: string }) {
    return axiosClient.post<AuthResponse>(URL_LOGIN, body);
  },
  logout() {
    return axiosClient.post(URL_LOGOUT);
  }
};

export default authApi;

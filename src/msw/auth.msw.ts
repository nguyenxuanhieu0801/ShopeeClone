import { rest } from 'msw';
import { config, HttpStatusCode } from '~/constants';

export const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmY5MzVlNWZkYzVmMDM3ZTZmNjhkMyIsImVtYWlsIjoiZDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0xNVQxNDowMzoyMy41NzdaIiwiaWF0IjoxNjcxMTEzMDAzLCJleHAiOjE2NzExMTMwMDR9.-gQIpbbKFlRqBlpiiAOBD4puP8jcMtZ2lobXPcy1zmU';
export const refresh_token_1000days =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmY5MzVlNWZkYzVmMDM3ZTZmNjhkMyIsImVtYWlsIjoiZDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0xNVQxNDowNTozNS41MTVaIiwiaWF0IjoxNjcxMTEzMTM1LCJleHAiOjE3NTc1MTMxMzV9.OHDBqBjhih1fgNe6-mWo0PQ-IcukNz4ljlXUCxM-8V8';

export const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmY5MzVlNWZkYzVmMDM3ZTZmNjhkMyIsImVtYWlsIjoiZDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0xOVQxMzo1ODo0OC40ODlaIiwiaWF0IjoxNjcxNDU4MzI4LCJleHAiOjE2ODE0NTgzMjd9.00oi-93dF4Wz2Ngb6_G2dXO4VQXf2cRCft3W8DKgPdA';

const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBmZDMwNWZkYzVmMDM3ZTZmNjhkZiIsImVtYWlsIjoiZGVtbzEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAxLTA5VDE2OjI4OjU3LjA0MloiLCJpYXQiOjE2NzMyODE3MzcsImV4cCI6MTY3MzI4MTc0Mn0.KnUDFOY1szTMlhSJnW46YQu0gyZjWc-KnJ7Z44_A0II',
    expires: 5,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBmZDMwNWZkYzVmMDM3ZTZmNjhkZiIsImVtYWlsIjoiZGVtbzEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAxLTA5VDE2OjI4OjU3LjA0MloiLCJpYXQiOjE2NzMyODE3MzcsImV4cCI6MTY3MzI4NTMzN30.vYaGXcTeZ_Pf2b3PNznLHBZ9IRBUKReId-rINVXiwvg',
    expires_refresh_token: 3600,
    user: {
      _id: '6370fd305fdc5f037e6f68df',
      roles: ['User'],
      email: 'demo123@gmail.com',
      createdAt: '2022-11-13T14:20:32.243Z',
      updatedAt: '2022-12-07T15:13:28.950Z',
      __v: 0,
      address: 'Ho chi minh',
      date_of_birth: '2000-02-01T17:00:00.000Z',
      name: 'Demo',
      phone: '0987654321',
      avatar: 'fb36372d-7ce7-4079-9a2d-46cabb22cad3.jpg'
    }
  }
};

const refreshTokenRes = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmY5MzVlNWZkYzVmMDM3ZTZmNjhkMyIsImVtYWlsIjoiZDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0xOVQwNzozMTowMC4yNTJaIiwiaWF0IjoxNjcxNDM1MDYwLCJleHAiOjE2NzIwMzk4NjB9.vTHglpuxad5h_CPpIaDCUpW0xJPYarJzLFeeul0W61E'
  }
};

const loginRequest = rest.post(`${config.baseUrl}login`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes));
});

const refreshToken = rest.post(`${config.baseUrl}refresh-access-token`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(refreshTokenRes));
});

const authRequests = [loginRequest, refreshToken];

export default authRequests;

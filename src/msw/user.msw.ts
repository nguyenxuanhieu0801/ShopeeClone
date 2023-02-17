import { rest } from 'msw';
import config from 'src/constants/config';
import { HttpStatusCode } from '~/constants';
import { access_token_1s } from './auth.msw';

const meRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '6370fd305fdc5f037e6f68df',
    roles: ['User'],
    email: 'demo123@gmail.com',
    createdAt: '2022-11-13T14:20:32.243Z',
    updatedAt: '2022-12-07T15:13:28.950Z',
    address: 'Ho chi minh',
    date_of_birth: '2000-02-01T17:00:00.000Z',
    name: 'Demo',
    phone: '0987654321',
    avatar: 'fb36372d-7ce7-4079-9a2d-46cabb22cad3.jpg'
  }
};

const meRequest = rest.get(`${config.baseUrl}me`, (req, res, ctx) => {
  const access_token = req.headers.get('authorization');
  if (access_token === access_token_1s) {
    return res(
      ctx.status(HttpStatusCode.Unauthorized),
      ctx.json({
        message: 'Lỗi',
        data: {
          message: 'Token hết hạn',
          name: 'EXPIRED_TOKEN'
        }
      })
    );
  }
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(meRes));
});

const userRequests = [meRequest];

export default userRequests;

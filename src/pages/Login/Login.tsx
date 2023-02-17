import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import authApi from '~/apis/auth.api';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { routes } from '~/constants';
import { useApp } from '~/contexts';
import { ErrorResponse } from '~/types';
import { isAxiosUnprocessableEntityError } from '~/utils';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email là bắt buộc')
      .email('Email không đúng định dạng')
      .min(5, 'Độ dài từ 5 - 160 ký tự')
      .max(160, 'Độ dài từ 5 - 160 ký tự'),
    password: yup
      .string()
      .required('Password là bắt buộc')
      .min(6, 'Độ dài từ 6 - 160 ký tự')
      .max(160, 'Độ dài từ 6 - 160 ký tự')
  })
  .required();

type FormLogin = yup.InferType<typeof schema>;

const Login = () => {
  const { setIsAuthenticated, setProfile } = useApp();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormLogin>({
    resolver: yupResolver(schema)
  });

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormLogin, 'confirm_password'>) => authApi.login(body)
  });
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        setIsAuthenticated(true);
        setProfile(data.data.data.user);
        navigate('/');
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormLogin>>(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormLogin, {
                message: formError[key as keyof FormLogin],
                type: 'Server'
              });
            });
          }
        }
      }
    });
  });

  return (
    <div className='bg-orange'>
      <Helmet>
        <title>Đăng nhập | Shopee Clone</title>
        <meta name='description' content='Đăng nhập vào dự án Shopee Clone' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={routes.register}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

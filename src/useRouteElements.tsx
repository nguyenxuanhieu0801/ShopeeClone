import { lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import routes from '~/constants/routes';
import { useApp } from './contexts';
import AuthLayout from './layouts/AuthLayout';
import CartLayout from './layouts/CartLayout';
import MainLayout from './layouts/MainLayout';
import UserLayout from './pages/User/layouts/UserLayout';

const Login = lazy(() => import('./pages/Login'));
const ProductList = lazy(() => import('./pages/ProductList'));
const Profile = lazy(() => import('./pages/User/pages/Profile'));
const Register = lazy(() => import('./pages/Register'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'));
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ProtectedRoute() {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
  const { isAuthenticated } = useApp();

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

const useRouteElement = () => {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: routes.login,
          element: (
            <AuthLayout>
              <Login />
            </AuthLayout>
          )
        },
        {
          path: routes.register,
          element: (
            <AuthLayout>
              <Register />
            </AuthLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: routes.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: routes.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: routes.profile,
              element: <Profile />
            },
            {
              path: routes.changePassword,
              element: <ChangePassword />
            },
            {
              path: routes.historyPurchase,
              element: <HistoryPurchase />
            }
          ]
        }
      ]
    },
    {
      path: routes.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ]);
  return routeElements;
};

export default useRouteElement;

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ErrorBoundary from './components/ErrorBoundary';
import { useApp } from './contexts';
import useRouteElement from './useRouteElements';
import { localStorageEventTarget } from './utils';

const App = () => {
  const { reset } = useApp();
  const routeElement = useRouteElement();

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset);
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset);
    };
  }, [reset]);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Suspense>
          {routeElement}
          <ToastContainer />
        </Suspense>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  );
};

export default App;

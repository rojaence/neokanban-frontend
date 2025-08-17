import './App.css';
import AppRouter from '@/router/AppRouter';
import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/shared/lib/queryClient';
import { Toaster } from './shared/components/ui/sonner';
import { Suspense } from 'react';
import { LoadingView } from './shared/views/LoadingView';

const App = () => {
  return (
    <Suspense fallback={<LoadingView />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={AppRouter} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;

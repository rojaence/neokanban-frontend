import './App.css';
import AppRouter from '@/router/AppRouter';
import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/shared/lib/queryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRouter} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

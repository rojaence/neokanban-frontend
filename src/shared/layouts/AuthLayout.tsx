import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <>
      <main className="bg-linear-to-bl from-violet-500 to-fuchsia-500 min-h-screen grid content-center p-4">
        <Outlet />
      </main>
    </>
  );
};

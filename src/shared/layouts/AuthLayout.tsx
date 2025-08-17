import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <>
      <main className="bg-linear-to-bl from-cyan-700 to-emerald-700 min-h-screen grid content-center p-4">
        <Outlet />
      </main>
    </>
  );
};

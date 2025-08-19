import type React from 'react';
import { useLocation } from 'react-router';

interface Props {
  start?: React.ReactNode;
}

export const AppHeader = ({ start }: Props) => {
  const location = useLocation();
  return (
    <header>
      {start}
      <h1>{location.pathname}</h1>
    </header>
  );
};

import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../redux/hooks';

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { pathname } = useLocation();
  const { isLoading, user } = useAppSelector((state) => state.user);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }
  return <div>{children}</div>;
}

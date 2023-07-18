import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: IProps) {
  const { pathname } = useLocation();

  const [isLoading, setisLoading] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setisLoggedIn(true);
      setisLoading(false);
    } else {
      setisLoading(false);
      setisLoading(false);
    }
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn && !isLoading) {
    return <Navigate to="/login" state={{ pathname }} />;
  }

  return <div>{children}</div>;
}

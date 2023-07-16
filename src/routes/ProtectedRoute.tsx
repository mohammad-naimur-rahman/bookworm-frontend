import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../redux/hooks';

const withAuth = (WrappedComponent: React.ComponentType) => {
  function ProtectedRoute() {
    const {
      isLoading,
      user: { email },
    } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
      if (!email) {
        navigate('/login', { state: { pathname } });
      }
    }, [email, navigate, pathname]);

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (email) {
      return <WrappedComponent />;
    }
  }

  return ProtectedRoute;
};

export default withAuth;

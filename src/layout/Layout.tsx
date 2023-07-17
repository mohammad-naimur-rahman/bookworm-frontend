import { onAuthStateChanged } from 'firebase/auth';
import { ReactNode, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

import auth from '../lib/firebase';
import {
  ILocalUser,
  setLoading,
  setUser,
} from '../redux/features/user/userSlice';
import { useAppDispatch } from '../redux/hooks';
import Footer from '../ui/Footer';
import Nav from '../ui/Nav';

interface Props {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title }: Props) {
  const dispatch = useAppDispatch();

  const checkAuth = useCallback(async () => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        const userDataJSON = localStorage.getItem('user');
        const userData: ILocalUser = userDataJSON && JSON.parse(userDataJSON);
        const { name, email, id } = { ...userData };
        if (email) {
          dispatch(setLoading(false));
          dispatch(setUser({ name, email, id }));
        }
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <Helmet>
        <title>{title ? `${title} | Bookworm` : 'Bookworm'}</title>
      </Helmet>
      <Nav />
      <main className="pt-20 container">{children}</main>
      <Footer />
      <Toaster position="top-center" />
    </>
  );
}

Layout.defaultProps = {
  title: 'Bookworm',
};

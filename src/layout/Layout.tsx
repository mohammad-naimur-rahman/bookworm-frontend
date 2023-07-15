import { onAuthStateChanged } from 'firebase/auth';
import { ReactNode, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import auth from '../lib/firebase';
import { setLoading, setUser } from '../redux/features/user/userSlice';
import { useAppDispatch } from '../redux/hooks';
import Footer from '../ui/Footer';
import Nav from '../ui/Nav';

interface Props {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        dispatch(setUser(user.email));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title>{title ? `${title} | Bookworm` : 'Bookworm'}</title>
      </Helmet>
      <Nav />
      <main className="pt-20 container">{children}</main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: 'Bookworm',
};

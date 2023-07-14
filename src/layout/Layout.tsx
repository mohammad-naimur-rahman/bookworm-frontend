import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../ui/Footer';
import Nav from '../ui/Nav';

interface Props {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title }: Props) {
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

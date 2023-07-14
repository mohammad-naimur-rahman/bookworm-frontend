import { ReactNode } from 'react';
import Footer from '../ui/Footer';
import Nav from '../ui/Nav';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Nav />
      <main className="pt-20 container">{children}</main>
      <Footer />
    </>
  );
}

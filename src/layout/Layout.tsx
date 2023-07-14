import { ReactNode } from 'react';
import Nav from '../ui/Nav';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}

import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit profile | Blog app',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
    </>
  );
}

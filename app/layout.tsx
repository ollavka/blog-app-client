import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { SideBar } from '@/components/SideBar';
import { Main } from '@/components/Main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home page | Blog app',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="bg-black overflow-x-hidden">
      <body className={inter.className}>
        <Providers>
          <div className="text-white w-screen bg-black md:flex">
            <SideBar />

            <Main>
              {children}
            </Main>
          </div>

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            closeButton
          />

          <div id="post-portal" />
        </Providers>
      </body>
    </html>
  );
}

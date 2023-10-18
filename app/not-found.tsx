import Link from 'next/link'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found Page | Blog app',
};

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col gap-8 items-center justify-center">
      <div className="p-10 h-full flex flex-col gap-8 items-center justify-center">
        <h2 className="font-bold text-3xl md:text-4xl text-center">Not Found Page</h2>
        <p className="text-2xl md:text-3xl text-center">Could not find requested resource</p>
        <Link
          className="inline-block p-4 bg-blue-500 rounded-md transition duration-300 ease-in-out hover:bg-blue-500/50"
          href="/"
          >
          Return Home
        </Link>
      </div>
    </div>
  );
}

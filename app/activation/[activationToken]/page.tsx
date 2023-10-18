'use client';

import { useEffect, useState } from 'react';
import { authService } from '@/services/authService';
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify';
import { FullScreenLoader } from '@/components/FullScreenLoader';
import { useCountdown } from '@/hooks/useCountdown';
import { useURL } from '@/hooks/useURL';
import Link from 'next/link';

export default function ActivationPage() {
  const { activationToken } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { replacePathname } = useURL();

  const count = useCountdown(3, () => replacePathname({ path: '/' }));

  useEffect(() => {
    setPageLoading(false);
  }, []);

  useEffect(() => {
    if (pageLoading) {
      return;
    }

    const activateAccount = async() => {
      try {
        await authService.activate(activationToken as string);

        toast.success('Your account is now active');
      } catch (err) {
        toast.error('Wrong activation link');
      } finally {
        setLoaded(true);
      }
    };

    activateAccount();
  }, [pageLoading]);

  if (!loaded) {
    return (
      <FullScreenLoader />
    )
  }

  return (
    <div className="w-screen h-screen bg-neutral-800 flex flex-col gap-8 justify-center items-center">
      <h1 className="font-bold text-3xl md:text-4xl">Account ativation</h1>
      <p>
        Redirect to{' '}
      
        <Link 
          href="/" 
          className="text-blue-500 transition duration-300 ease-in-out"
        >
          Homepage
        </Link> 
      
        {' '}in {count} seconds...
      </p>
    </div>
  );
}

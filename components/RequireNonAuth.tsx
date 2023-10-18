/* eslint-disable react/display-name */
'use client';

import { useURL } from '@/hooks/useURL';
import { useEffect, useState } from 'react';
import { FullScreenLoader } from '@/components/FullScreenLoader';
import { accessTokenService } from '@/services/accessTokenService';

export const RequireNonAuth = (Component: any) => {
  const NonAuthComponent = (props: any) => {
    const { replacePathname } = useURL();
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
      setPageLoading(false);
    }, []);

    useEffect(() => {
      if (!pageLoading) {
        return;
      }

      const accessToken = accessTokenService.get();
      
      if (accessToken) {
        replacePathname({ path: '/' });
      }
    }, [pageLoading])

    if (pageLoading) {
      return (
        <FullScreenLoader />
      );
    }

    return <Component {...props} />;
  };

  return NonAuthComponent;
};

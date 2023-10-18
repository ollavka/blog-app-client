/* eslint-disable react/display-name */
'use client';

import { useURL } from "@/hooks/useURL";
import { selectAuth } from "@/redux/features/auth/selectors";
import { checkAuth } from "@/redux/features/auth/thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from 'react-toastify';
import { accessTokenService } from "@/services/accessTokenService";
import { useEffect, useRef, useState } from 'react';
import { FullScreenLoader } from '@/components/FullScreenLoader';
import { GlobalError } from '@/components/GlobalError';

export const RequireAuth = (Component: any) => {
  const AuthComponent = (props: any) => {
    const { replacePathname, pushPathname, pathname, searchParams } = useURL();
    const { isAuth, isLoading, error } = useAppSelector(selectAuth);
    const [pageLoading, setPageLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
      setPageLoading(false);
    }, []);

    useEffect(() => {
      if (!error) {
        return;
      }

      toast.error(`Oops: ${error?.message || 'Network error'}`);
    }, [error]);

    useEffect(() => {
      if (pageLoading) {
        return;
      }

      const redirectUrl = searchParams.get('redirectUrl');

      if (redirectUrl) {
        pushPathname({ params: { redirectUrl: null } });
      }
    }, [searchParams]);

    useEffect(() => {
      if (pageLoading) {
        return;
      }

      const accessToken = accessTokenService.get();

      if (!accessToken) {
        const redirectUrl = pathname !== '/'
          ? pathname
          : null;

        replacePathname({ path: '/login', params: { redirectUrl } });

        return;
      }

      if (!isAuth) {
        dispatch(checkAuth())
        return;
      }
    }, [pageLoading]);

    if (error) {
      return (
        <GlobalError reload={() => dispatch(checkAuth())} />
      )
    }

    if (pageLoading || isLoading || !isAuth) {
      return (
        <FullScreenLoader />
      );
    }

    return (
      <Component {...props} />
    );
  };

  return AuthComponent;
};


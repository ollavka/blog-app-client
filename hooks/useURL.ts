'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { SearchParams } from '@/types';
import { getSearchWith } from '@/utils/searchHelper';

type PathnameConfig = {
  path?: string;
  params?: SearchParams;
}

export const useURL = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currParams = useSearchParams();
  
  const searchParams = new URLSearchParams(currParams.toString());
  
  const getPreparedPathname = ({ path = '', params = {} }: PathnameConfig) => {
    const paramsList = getSearchWith(searchParams, params);

    const newSearchParams = paramsList.toString()
      ? `?${paramsList.toString()}`
      : '';

    return `${path || pathname}${newSearchParams}`;
  };

  const pushPathname = (config: PathnameConfig) => {
    const preparedPathname = getPreparedPathname(config);

    router.push(preparedPathname);
  };

  const replacePathname = (config: PathnameConfig) => {
    const preparedPathname = getPreparedPathname(config);

    router.replace(preparedPathname);
  };

  const removeAllParams = () => {
    router.push(pathname);
  }

  const checkActiveLink = (linkPath: string) => {
    return pathname === linkPath;
  };

  return {
    router,
    pathname,
    searchParams,
    getPreparedPathname,
    pushPathname,
    replacePathname,
    removeAllParams,
    checkActiveLink,
  }
};
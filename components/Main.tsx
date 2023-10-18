'use client';

import { FC, PropsWithChildren } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/features/auth/selectors';
import cn from 'classnames';

export const Main: FC<PropsWithChildren> = ({ children }) => {
  const { isAuth } = useAppSelector(selectAuth);

  const mainClasses = cn({
    ['px-8 md:pl-32 md:pr-16 pt-5 grow pb-14 max-w-screen-lg mx-auto my-0']:
      isAuth,
  });

  return <main className={mainClasses}>{children}</main>;
};

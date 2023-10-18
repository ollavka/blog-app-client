'use client';

import { useState, useEffect } from 'react';
import { IconType } from '@/types';
import { NavLink } from './NavLink';
import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/features/auth/selectors';
import { LogoutButton } from './LogoutButton';
import { CreatePostLink } from './CreatePostLink';
import { useURL } from '@/hooks/useURL';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';

export const SideBar = () => {
  const { pathname } = useURL();
  const { isAuth, user, isLoading } = useAppSelector(selectAuth);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowSidebar(false);
    }

    if (!pathname.includes('login')) {
      setShowSidebar(true);
    }
  }, [pathname, isLoading]);

  const asideClasses = cn(
    'border-neutral-700 fixed z-10 bg-black',
    'border-t-2 bottom-0 w-screen',
    'md:border-t-0 md:border-r md:h-screen md:w-min',
    'xl:w-[200px] 2xl:w-[250px]'
  );

  const navLinkClasses = cn(
    'group/navlink cursor-pointer text-base font-medium flex items-center gap-4 p-3 rounded-xl',
    'transition-all ease-in-out duration-300',
    'hover:bg-neutral-700/50 active:opacity-50'
  );

  return (
    <>
      {isAuth && showSidebar && (
        <aside className={asideClasses}>
          <nav className="h-full py-[5px] sm:px-0 md:px-3 md:py-6">
            <Link
              href="/"
              className="text-left pl-3 hidden md:block uppercase font-bold xl:text-2xl"
            >
              Blog
            </Link>

            <ul className="h-5/6 flex items-center xl:items-stretch justify-around md:justify-stretch gap-3 md:flex-col md:mt-8">
              <li>
                <NavLink
                  href="/"
                  iconType={IconType.Home}
                  title="home"
                  className={navLinkClasses}
                />
              </li>

              <li>
                <CreatePostLink className={navLinkClasses} />
              </li>

              <li>
                <NavLink
                  href={`/profile/${user?.username}`}
                  title="profile"
                  className={navLinkClasses}
                >
                  <div
                    className={cn(
                      'relative w-6 h-6 rounded-full bg-white transition duration-300 ease-in-out overflow-hidden group-hover/navlink:scale-105 group-active/navlink:scale-100',
                      {
                        'border-2 border-white': pathname.includes(
                          user?.username as string
                        ),
                      }
                    )}
                  >
                    <Image
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      src={user?.avatar || '/images/avatar.png'}
                      alt="avatar"
                      width={500}
                      height={500}
                    />
                  </div>
                </NavLink>
              </li>

              <li className="md:flex md:grow">
                <LogoutButton className="self-end" />
              </li>
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
};

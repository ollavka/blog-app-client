'use client';

import { FC, ReactNode } from 'react';
import { useURL } from '@/hooks/useURL';
import { Icon } from './Icon';
import { IconType } from '@/types';
import { capitalize } from '@/utils/capitalize';
import { Tooltip, useBreakpointValue } from '@chakra-ui/react';
import Link from 'next/link';
import cn from 'classnames';

type Props = {
  href: string;
  className?: string;
  iconType?: IconType;
  title: string;
  children?: ReactNode;
  onClick?: () => void;
};

export const NavLink: FC<Props> = (props) => {
  const {
    href,
    iconType,
    className = '',
    title = '',
    children,
    onClick = () => {},
  } = props;

  const tooltipIsDisabled = useBreakpointValue(
    {
      base: true,
      md: false,
      xl: true,
    },
    {
      fallback: 'xl',
    }
  );

  const { checkActiveLink } = useURL();

  const isActiveLink = checkActiveLink(href);

  const normalizedTitle = capitalize(title);

  return (
    <Tooltip
      isDisabled={tooltipIsDisabled}
      label={normalizedTitle}
      placement="right"
      hasArrow
      bg="gray.800"
      color="white"
      aria-label={normalizedTitle}
    >
      <Link
        href={href}
        className={cn(className, 'text-white')}
        onClick={onClick}
      >
        {iconType && (
          <Icon
            type={iconType}
            className={cn(
              'w-6 h-6 stroke-white stroke-2 transition duration-300 ease-in-out group-hover/navlink:scale-105 group-active/navlink:scale-100',
              {
                ['fill-white stroke-1']: isActiveLink,
              }
            )}
          />
        )}

        {children}

        <span
          className={cn('hidden xl:block text-white', {
            ['font-bold']: isActiveLink,
          })}
        >
          {normalizedTitle}
        </span>
      </Link>
    </Tooltip>
  );
};

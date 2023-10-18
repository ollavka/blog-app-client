import { FC } from 'react';
import type { IconType } from '@/types';

type Props = {
  type: IconType;
  className?: string;
};

export const Icon: FC<Props> = ({ type, className = '' }) => {
  const iconPath = `/icons/${type}.svg#icon-${type}`;

  return (
    <svg role="img" aria-labelledby={type} className={className}>
      <use href={iconPath} />
    </svg>
  );
};

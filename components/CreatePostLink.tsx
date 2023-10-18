'use client';

import { FC, useState } from 'react';
import { NavLink } from './NavLink';
import { CreatePostModal } from './CreatePostModal';
import { IconType } from '@/types';

type Props = {
  className?: string;
};

export const CreatePostLink: FC<Props> = ({ className = '' }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <NavLink
        href="#"
        iconType={IconType.Create}
        title="create"
        className={className}
        onClick={() => setShowModal(true)}
      />

      {showModal && <CreatePostModal onClose={() => setShowModal(false)} />}
    </>
  );
};

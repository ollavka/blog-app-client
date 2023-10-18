'ues client';

import { FC } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/features/auth/thunks';
import { FiLogOut } from 'react-icons/fi';
import { useURL } from '@/hooks/useURL';
import cn from 'classnames';

type Props = {
  className?: string;
};

export const LogoutButton: FC<Props> = ({ className = '' }) => {
  const { replacePathname } = useURL();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      replacePathname({ path: '/login' });
    });
  };

  return (
    <button
      onClick={handleLogout}
      className={cn(
        'flex items-center bg-red-500 w-max hover:bg-red-600 p-2 rounded-xl transition duration-300',
        className
      )}
    >
      <FiLogOut className="mr-2 w-6 h-6" />

      <span className="text-white font-bold hidden xl:block">Log out</span>
    </button>
  );
};

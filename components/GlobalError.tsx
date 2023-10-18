'use client';

import { FC } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  reload: () => void;
};

export const GlobalError: FC<Props> = ({ reload = () => {} }) => {
  return (
    <div className="w-screen h-screen flex flex-col gap-8 items-center justify-center">
      <div className="p-10 h-full flex flex-col gap-8 items-center justify-center">
        <h2 className="font-bold text-3xl md:text-4xl text-center">Oops!</h2>
        <p className="text-2xl md:text-3xl text-center">
          Something went wrong...
        </p>
        <Button
          onClick={reload}
          colorScheme="green"
          className="inline-block flex justify-center items-center p-4 bg-green-500 rounded-md transition duration-300 ease-in-out hover:bg-green-500/50"
        >
          Reload
        </Button>
      </div>
    </div>
  );
};

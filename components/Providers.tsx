'use client';

import { PropsWithChildren } from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <CacheProvider>
      <ChakraProvider>
        <CSSReset />
        <Provider store={store}>
          {children}
        </Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}

import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { CopyButtons } from './CopyButtons';

export const Popup: React.VFC = () => (
  <ChakraProvider>
    <CopyButtons />
  </ChakraProvider>
);

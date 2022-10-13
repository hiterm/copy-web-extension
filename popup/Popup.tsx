import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { CopyButtons } from './CopyButtons';
import { MantineProvider } from '@mantine/core';

export const Popup: React.VFC = () => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <ChakraProvider>
      <CopyButtons />
    </ChakraProvider>
  </MantineProvider>
);

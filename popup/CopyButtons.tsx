import React from 'react';
import browser from 'webextension-polyfill';
import { Box, Button } from '@chakra-ui/react';

const copyMarkdownLink = async () => {
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  const tab = tabs[0];
  const markdownLink = `[${tab.title}](${tab.url})`;
  navigator.clipboard.writeText(markdownLink);
};

export const CopyButtons: React.VFC = () => (
  <Box sx={{ margin: 1 }}>
    <Button colorScheme="teal" onClick={copyMarkdownLink}>Copy markdown link</Button>
  </Box>
);


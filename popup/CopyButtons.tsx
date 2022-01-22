import React, { useState } from 'react';
import browser from 'webextension-polyfill';
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react';
import { CopyHtmlLinkButton } from './CopyHtmlLinkButton';

const copyMarkdownUrl = async () => {
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  const tab = tabs[0];
  const markdownLink = `[${tab.title}](${tab.url})`;
  navigator.clipboard.writeText(markdownLink);
};

const copyJiraUrl = async () => {
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  const tab = tabs[0];
  const jiraLink = `[${tab.title}|${tab.url}]`;
  navigator.clipboard.writeText(jiraLink);
};

const CopyMarkdownLinkButton: React.VFC = () => {
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    await copyMarkdownUrl();
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <Popover isOpen={open}>
      <PopoverTrigger>
        <Button colorScheme="teal" onClick={handleClick}>
          Copy markdown link
        </Button>
      </PopoverTrigger>
      <PopoverContent sx={{ width: 100 }}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Copied!</PopoverHeader>
      </PopoverContent>
    </Popover>
  );
};

export const CopyButtons: React.VFC = () => (
  <Box sx={{ margin: 1 }}>
    <Stack direction="column">
      <CopyMarkdownLinkButton />
      <Button colorScheme="teal" onClick={copyJiraUrl}>
        Copy Jira link
      </Button>
      <CopyHtmlLinkButton />
    </Stack>
  </Box>
);

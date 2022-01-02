import React from 'react';
import browser from 'webextension-polyfill';
import { Box, Button, Stack } from '@chakra-ui/react';
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

export const CopyButtons: React.VFC = () => (
  <Box sx={{ margin: 1 }}>
    <Stack direction="column">
      <Button colorScheme="teal" onClick={copyMarkdownUrl}>
        Copy markdown link
      </Button>
      <Button colorScheme="teal" onClick={copyJiraUrl}>
        Copy Jira link
      </Button>
      <CopyHtmlLinkButton />
    </Stack>
  </Box>
);

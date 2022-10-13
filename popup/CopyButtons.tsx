import React from 'react';
import browser from 'webextension-polyfill';
import { CopyHtmlLinkButton } from './CopyHtmlLinkButton';
import { Box, Button, Stack } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';

const getMarkdownUrl = async (): Promise<string> => {
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  const tab = tabs[0];
  const markdownLink = `[${tab.title}](${tab.url})`;
  return markdownLink;
};

const getJiraUrl = async (): Promise<string> => {
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  const tab = tabs[0];
  const jiraLink = `[${tab.title}|${tab.url}]`;
  return jiraLink;
};

export const CopyButtons: React.VFC = () => {
  const markdownClipboard = useClipboard({ timeout: 1000 });
  const jiraClipboard = useClipboard({ timeout: 1000 });

  return (
    <Box sx={{ margin: 5 }}>
      <Stack spacing={5}>
        <Button
          color={markdownClipboard.copied ? 'teal' : 'blue'}
          onClick={async () => markdownClipboard.copy(await getMarkdownUrl())}
        >
          {markdownClipboard.copied ? 'Copied' : 'Copy Markdown link'}
        </Button>
        <Button
          color={jiraClipboard.copied ? 'teal' : 'blue'}
          onClick={async () => jiraClipboard.copy(await getJiraUrl())}
        >
          {jiraClipboard.copied ? 'Copied' : 'Copy Jira link'}
        </Button>
        <CopyHtmlLinkButton />
      </Stack>
    </Box>
  );
};

import React from 'react';
import browser from 'webextension-polyfill';
import { CopyHtmlLinkButton } from './CopyHtmlLinkButton';
import { ButtonWithPopover } from './ButtonWithPopover';
import { Box, Button, Stack } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';

const getMarkdownUrl = async (): Promise<string> => {
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  const tab = tabs[0];
  const markdownLink = `[${tab.title}](${tab.url})`;
  return markdownLink;
};

const copyJiraUrl = async () => {
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  const tab = tabs[0];
  const jiraLink = `[${tab.title}|${tab.url}]`;
  navigator.clipboard.writeText(jiraLink);
};

export const CopyButtons: React.VFC = () => {
  const clipboard = useClipboard({ timeout: 1000 });

  return (
    <Box sx={{ margin: 5 }}>
      <Stack spacing={5}>
        <Button
          color={clipboard.copied ? 'teal' : 'blue'}
          onClick={async () => clipboard.copy(await getMarkdownUrl())}
        >
          {clipboard.copied ? 'Copied' : 'Copy Markdown link'}
        </Button>
        <ButtonWithPopover onClick={copyJiraUrl}>
          Copy Jira link
        </ButtonWithPopover>
        <CopyHtmlLinkButton />
      </Stack>
    </Box>
  );
};

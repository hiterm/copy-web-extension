import { Button } from '@chakra-ui/react';
import React, { useRef } from 'react';
import browser from 'webextension-polyfill';

export const CopyHtmlLinkButton: React.VFC = () => {
  const aRef = useRef<HTMLAnchorElement>(null!);

  const handleClick = async () => {
    const tabs = await browser.tabs.query({
      currentWindow: true,
      active: true,
    });
    const tab = tabs[0];
    const title = tab.title;
    const url = tab.url;

    aRef.current.textContent = title!;
    aRef.current.href = url!;

    const range = document.createRange();
    range.selectNode(aRef.current);
    const selection = window.getSelection()!;
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
  };

  return (
    <>
      <Button colorScheme="teal" onClick={handleClick}>
        Copy HTML link
      </Button>
      <a href="https://google.com" ref={aRef}>
        link
      </a>
    </>
  );
};

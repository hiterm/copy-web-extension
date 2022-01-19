import { Button, Link } from '@chakra-ui/react';
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

    // TODO: Use Clipboard.write when stabilized
    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write
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
      <Link href="https://google.com" ref={aRef} sx={{position: 'absolute', top: '-100px'}}>
        link
      </Link>
    </>
  );
};

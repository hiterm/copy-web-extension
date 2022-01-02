import { Button } from '@chakra-ui/react';
import React, { useRef } from 'react';

export const CopyHtmlLinkButton: React.VFC = () => {
  const aRef = useRef<HTMLAnchorElement>(null!);

  const handleClick = () => {
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

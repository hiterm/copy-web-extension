import React, { useState } from 'react';
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';

type ButtonWithPopoverProps = {
  onClick: () => unknown;
  children: React.ReactNode;
};

export const ButtonWithPopover: React.VFC<ButtonWithPopoverProps> = ({
  children,
  onClick,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    const onClickResult = onClick();
    if (onClickResult instanceof Promise) {
      await onClickResult;
    }
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <Popover isOpen={open}>
      <PopoverTrigger>
        <Button colorScheme="teal" onClick={handleClick}>
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent sx={{ width: 90, textAlign: 'center' }}>
        <PopoverArrow />
        <PopoverHeader>Copied!</PopoverHeader>
      </PopoverContent>
    </Popover>
  );
};

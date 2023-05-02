import React from 'react';
import { Flex } from '@chakra-ui/react';
import { AuthButtons } from './AuthButtons';
import { ActionIcons } from './ActionIcons';
import { MenuWrapper } from './ProfileMenu/MenuWrapper';

const RightContent: React.FC = () => {
  return (
    <>
      <Flex justifyContent='space-between' alignItems='center'>
        <ActionIcons />
        <AuthButtons />
        <MenuWrapper />
      </Flex>
    </>
  );
};

export default RightContent;

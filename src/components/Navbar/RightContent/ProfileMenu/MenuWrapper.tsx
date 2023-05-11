import React from 'react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react';

import { NoUserList } from './NoUserList';
import { UserList } from './UserList';

import { withUrqlClient } from 'next-urql';
import { GoGistSecret } from 'react-icons/go';
import { IoSparkles } from 'react-icons/io5';
import { VscAccount } from 'react-icons/vsc';
import { useGetUserQuery } from '../../../../graphql/generated/graphql';
import { isServer } from '../../../../utils/isServer';
import { urqlClient } from '../../../../utils/urqlClient';

const MenuWrapper: React.FC = () => {
  const [{ data }] = useGetUserQuery({
    pause: isServer(),
  });
  const user = data?.getUser;
  return (
    <Menu>
      <MenuButton
        cursor='pointer'
        padding='0px 6px'
        borderRadius='4px'
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
      >
        <Flex alignItems='center'>
          <Flex alignItems='center'>
            {user ? (
              <>
                <Icon fontSize={32} mr={1} color='gray.500' as={GoGistSecret} />
                <Box
                  display={{ base: 'none', lg: 'flex' }}
                  flexDirection='column'
                  fontSize='8pt'
                  alignItems='flex-start'
                  mr={8}
                >
                  <Text fontWeight={700}>{user?.username || user?.email}</Text>
                  <Flex alignItems='center'>
                    <Icon as={IoSparkles} color='brand.100' mr={1} />
                    <Text color='gray.400'>1 karma</Text>
                  </Flex>
                </Box>
              </>
            ) : (
              <Icon fontSize={24} mr={1} color='gray.400' as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon color='gray.500' />
        </Flex>
      </MenuButton>
      <MenuList>{user ? <UserList /> : <NoUserList />}</MenuList>
    </Menu>
  );
};

export default withUrqlClient(urqlClient, { ssr: true })(MenuWrapper);

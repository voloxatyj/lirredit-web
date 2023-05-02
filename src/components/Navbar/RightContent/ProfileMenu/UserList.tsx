import React from 'react';
import { Flex, Icon, MenuDivider, MenuItem } from '@chakra-ui/react';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';

export const UserList: React.FC = () => {
  // const logout = async () => ();
  return (
    <>
      <MenuItem
        fontSize='10pt'
        fontWeight={700}
        _hover={{ bg: 'blue.500', color: 'white' }}
      >
        <Flex alignItems='center'>
          <Icon fontSize={20} mr={2} as={CgProfile} />
          Profile
        </Flex>
      </MenuItem>
      <MenuDivider />
      <MenuItem
        fontSize='10pt'
        fontWeight={700}
        _hover={{ bg: 'blue.500', color: 'white' }}
        // onClick={logout}
      >
        <Flex alignItems='center'>
          <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
          Log Out
        </Flex>
      </MenuItem>
    </>
  );
};

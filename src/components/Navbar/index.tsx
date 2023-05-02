import React from 'react';
import { Flex } from '@chakra-ui/react';
import Image from 'next/image';
import router from 'next/router';
import { SearchInput } from './SearchInput';
import RightContent from './RightContent';
import logo from '../../images/istockphoto.jpg';

const Navbar: React.FC = () => {
  return (
    <Flex
      bg='white'
      height='64px'
      padding='6px 12px'
      justifyContent={{ md: 'space-between' }}
    >
      <Flex
        align='center'
        width={{ base: '40px', md: 'auto' }}
        mr={{ base: 0, md: 2 }}
        cursor='pointer'
      >
        <Image src={logo} alt='logo' width={50} height={50} />
      </Flex>
      <SearchInput />
      <RightContent />
    </Flex>
  );
};

export default Navbar;

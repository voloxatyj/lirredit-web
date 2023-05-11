import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

export const SearchInput: React.FC = () => {
  return (
    <Flex flexGrow={1} maxWidth={'auto'} mr={2} alignItems='center'>
      <InputGroup>
        <InputLeftElement pointerEvents='none' color='gray.400'>
          <SearchIcon mb={3} />
        </InputLeftElement>
        <Input
          placeholder='Search'
          fontSize='10pt'
          _placeholder={{ color: 'gray.500' }}
          _hover={{
            bg: 'white',
            border: '1px solid',
            borderColor: 'blue.500',
          }}
          _focus={{
            outline: 'none',
            border: '1px solid',
            borderColor: 'blue.500',
          }}
          height='34px'
          bg='gray.50'
        />
      </InputGroup>
    </Flex>
  );
};

import React from 'react';
import { Flex, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

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

import React from 'react';
import { Button } from '@chakra-ui/react';

export const AuthButtons: React.FC = () => {
  return (
    <>
      <Button
        variant='outline'
        height='28px'
        display={{ base: 'none', sm: 'flex' }}
        width={{ base: '70px', md: '110px' }}
        mr={2}
        onClick={() => console.log('login')}
      >
        Log In
      </Button>
      <Button
        variant='solid'
        height='28px'
        display={{ base: 'none', sm: 'flex' }}
        width={{ base: '70px', md: '110px' }}
        mr={2}
        onClick={() => console.log('signup')}
      >
        Sign Up
      </Button>
    </>
  );
};

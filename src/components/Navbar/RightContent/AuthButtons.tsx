import React from 'react';

import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const AuthButtons: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Button
        variant='outline'
        height='28px'
        display={{ base: 'none', sm: 'flex' }}
        width={{ base: '70px', md: '110px' }}
        mr={2}
        onClick={() => router.push('/login')}
      >
        Log In
      </Button>
      <Button
        variant='solid'
        height='28px'
        display={{ base: 'none', sm: 'flex' }}
        width={{ base: '70px', md: '110px' }}
        mr={2}
        onClick={() => router.push('/register')}
      >
        Sign Up
      </Button>
    </>
  );
};

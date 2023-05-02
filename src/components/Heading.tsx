import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

interface IHeading {
  title: string;
}

export const Header: React.FC<IHeading> = ({ title }) => (
  <Box
    display='flex'
    w='100%'
    fontSize={40}
    justifyContent='center'
    fontWeight={800}
    mb='8'
  >
    <Heading>{title}</Heading>
  </Box>
);

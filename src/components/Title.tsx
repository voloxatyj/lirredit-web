import React from 'react';

import { Box } from '@chakra-ui/react';

interface ITitle {
  title: string;
}

export const Title: React.FC<ITitle> = ({ title }) => (
  <Box
    display='flex'
    w='100%'
    fontSize={40}
    justifyContent='center'
    fontWeight={800}
    mb='8'
  >
    <h1>{title}</h1>
  </Box>
);

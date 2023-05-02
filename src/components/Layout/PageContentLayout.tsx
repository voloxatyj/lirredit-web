import React from 'react';
import { Box } from '@chakra-ui/react';

export type PageContentLayoutVariant = 'small' | 'regular';

interface PageContentLayoutProps {
  variant?: PageContentLayoutVariant;
  children: JSX.Element;
}

export const PageContentLayout: React.FC<PageContentLayoutProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <Box
      mt={8}
      mx='auto'
      maxW={variant === 'regular' ? '800px' : '400px'}
      w='100%'
    >
      {children}
    </Box>
  );
};

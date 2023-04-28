import { ChakraProvider } from '@chakra-ui/react';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';

import theme from '../theme';
import { AppProps } from 'next/app';

const client = new Client({
  url: 'http://localhost:5000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [cacheExchange, fetchExchange],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;

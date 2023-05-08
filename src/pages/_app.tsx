import { ChakraProvider } from '@chakra-ui/react';
import { Client, Provider, fetchExchange } from 'urql';
import { cacheExchange, QueryInput, Cache } from '@urql/exchange-graphcache';

import theme from '../styles/theme';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import {
  GetUserDocument,
  GetUserQuery,
  LogInMutation,
  SignUpMutation,
} from '../graphql/generated/graphql';

function UpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query,
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = new Client({
  url: 'http://localhost:5000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            UpdateQuery<LogInMutation, GetUserQuery>(
              cache,
              { query: GetUserDocument },
              _result,
              (result, query) => {
                if (result.login?.errors) {
                  return query;
                }

                return {
                  getUser: result.login?.user,
                };
              },
            );
          },
          signUp: (_result, args, cache, info) => {
            UpdateQuery<SignUpMutation, GetUserQuery>(
              cache,
              { query: GetUserDocument },
              _result,
              (result, query) => {
                if (result.signUp?.errors) {
                  return query;
                }

                return {
                  getUser: result.signUp?.user,
                };
              },
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;

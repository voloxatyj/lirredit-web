import { fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import {
	LogInMutation,
	GetUserQuery,
	GetUserDocument,
	SignUpMutation,
	LogOutMutation,
} from '../graphql/generated/graphql';
import { UpdateQuery } from './updateQuery';

export const urqlClient = (ssrExchange: any) => ({
	url: process.env.NEXT_PUBLIC_API_URL as string,
	fetchOptions: {
		credentials: 'include' as const,
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
					logout: (_result, args, cache, info) => {
						UpdateQuery<LogOutMutation, GetUserQuery>(
							cache,
							{ query: GetUserDocument },
							_result,
							() => ({ getUser: null }),
						);
					},
				},
			},
		}),
		ssrExchange,
		fetchExchange,
	],
});

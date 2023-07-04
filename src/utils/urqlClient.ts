import { Exchange, fetchExchange, stringifyVariables } from 'urql';
import { FieldInfo, ResolveInfo, Resolver, cacheExchange } from '@urql/exchange-graphcache';
import {
	LogInMutation,
	GetUserQuery,
	GetUserDocument,
	SignUpMutation,
	LogOutMutation,
} from '../graphql/generated/graphql';
import { UpdateQuery } from './updateQuery';

import { pipe, tap } from 'wonka';
import Router from 'next/router';
import { isServer } from './isServer';

const errorExchange: Exchange =
	({ forward }) =>
	(ops$) => {
		return pipe(
			forward(ops$),
			tap(({ error }) => {
				if (error?.message.includes('not authenticated')) {
					Router.replace('/login');
				}
			}),
		);
	};

const cursorPagination = (): Resolver => {
	return (_parent, fieldArgs, cache, info) => {
		const { parentKey: entityKey, fieldName } = info as ResolveInfo;

		const allFields: FieldInfo[] = cache.inspectFields(entityKey);
		const fieldInfos = allFields.filter(
			(fieldInfo: FieldInfo) => fieldInfo.fieldName === fieldName,
		);
		const size = fieldInfos.length;

		if (size === 0) {
			return undefined;
		}

		const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
		const isItInTheCache = cache.resolve(
			cache.resolve(entityKey, fieldKey) as string,
			'posts',
		);

		info.partial = !isItInTheCache;
		const results: string[] = [];
		fieldInfos.forEach((fi) => {
			const key = cache.resolve(entityKey, fi.fieldKey) as string;
			const data = cache.resolve(key, 'posts') as string[];

			results.push(...data);
		});

		return {
			__typename: 'PostsResponse',
			posts: results,
		};
	};
};

export const urqlClient = (ssrExchange: any, ctx: any) => {
	let cookie = '';

	if (isServer()) {
		cookie = ctx?.req?.headers?.cookie;
	}

	return {
		url: process.env.NEXT_PUBLIC_API_URL as string,
		fetchOptions: {
			credentials: 'include' as const,
			headers: cookie
				? {
						cookie,
			}
				: undefined,
		},
		exchanges: [
			cacheExchange({
				keys: {
					PostsResponse: () => null,
				},
				resolvers: {
					Query: {
						posts: cursorPagination(),
					},
				},
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
			errorExchange,
			ssrExchange,
			fetchExchange,
		],
	};
};

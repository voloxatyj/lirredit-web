import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	DateTime: any;
};

export type ChangePasswordInput = {
	password: Scalars['String'];
	token: Scalars['String'];
};

export type FieldError = {
	__typename?: 'FieldError';
	field: Scalars['String'];
	message: Scalars['String'];
};

export type GetPostsInput = {
	cursor: Scalars['Float'];
	limit: Scalars['Float'];
	text?: InputMaybe<Scalars['String']>;
	title?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
	password: Scalars['String'];
	usernameOrEmail: Scalars['String'];
};

export type Mutation = {
	__typename?: 'Mutation';
	changePassword: UserResponse;
	create: PostResponse;
	forgotPassword: PasswordAuthResponse;
	login: UserResponse;
	logout: Scalars['Boolean'];
	removeUser: User;
	signUp: UserResponse;
	updateUser: User;
};

export type MutationChangePasswordArgs = {
	credentials: ChangePasswordInput;
};

export type MutationCreateArgs = {
	input: PostInput;
};

export type MutationForgotPasswordArgs = {
	email: Scalars['String'];
};

export type MutationLoginArgs = {
	credentials: LoginInput;
};

export type MutationRemoveUserArgs = {
	id: Scalars['Int'];
};

export type MutationSignUpArgs = {
	credentials: SignUpInput;
};

export type MutationUpdateUserArgs = {
	updateUserInput: UpdateUserInput;
};

export type PasswordAuthResponse = {
	__typename?: 'PasswordAuthResponse';
	errors?: Maybe<Array<FieldError>>;
	success: Scalars['Boolean'];
};

export type Post = {
	__typename?: 'Post';
	createdAt: Scalars['DateTime'];
	id: Scalars['Int'];
	image: Scalars['String'];
	points: Scalars['Float'];
	text: Scalars['String'];
	title: Scalars['String'];
	updatedAt: Scalars['DateTime'];
	userId: Scalars['Float'];
	users: User;
	voteStatus: Scalars['Float'];
};

export type PostInput = {
	text: Scalars['String'];
	title: Scalars['String'];
};

export type PostResponse = {
	__typename?: 'PostResponse';
	error?: Maybe<Scalars['String']>;
	post: Post;
};

export type PostsResponse = {
	__typename?: 'PostsResponse';
	error?: Maybe<Scalars['String']>;
	posts: Array<Post>;
};

export type Query = {
	__typename?: 'Query';
	getUser?: Maybe<User>;
	posts: PostsResponse;
	user: User;
};

export type QueryPostsArgs = {
	input: GetPostsInput;
};

export type QueryUserArgs = {
	email: Scalars['String'];
};

export type SignUpInput = {
	email: Scalars['String'];
	password: Scalars['String'];
	username: Scalars['String'];
};

export type UpdateUserInput = {
	email?: InputMaybe<Scalars['String']>;
	id: Scalars['Int'];
	password?: InputMaybe<Scalars['String']>;
	username?: InputMaybe<Scalars['String']>;
};

export type User = {
	__typename?: 'User';
	createdAt: Scalars['DateTime'];
	email: Scalars['String'];
	id: Scalars['Int'];
	updatedAt: Scalars['DateTime'];
	username: Scalars['String'];
};

export type UserResponse = {
	__typename?: 'UserResponse';
	errors?: Maybe<Array<FieldError>>;
	user?: Maybe<User>;
};

export type UserFragmentFragment = {
	__typename?: 'User';
	id: number;
	username: string;
	email: string;
};

export type ChangePasswordMutationVariables = Exact<{
	credentials: ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
	__typename?: 'Mutation';
	changePassword: {
		__typename?: 'UserResponse';
		errors?: Array<{
			__typename?: 'FieldError';
			field: string;
			message: string;
		}> | null;
		user?: {
			__typename?: 'User';
			id: number;
			email: string;
			username: string;
		} | null;
	};
};

export type CreatePostMutationVariables = Exact<{
	input: PostInput;
}>;

export type CreatePostMutation = {
	__typename?: 'Mutation';
	create: {
		__typename?: 'PostResponse';
		error?: string | null;
		post: {
			__typename?: 'Post';
			id: number;
			createdAt: any;
			updatedAt: any;
			title: string;
			text: string;
			points: number;
			users: {
				__typename?: 'User';
				id: number;
				email: string;
				username: string;
			};
		};
	};
};

export type ForgotPasswordMutationVariables = Exact<{
	email: Scalars['String'];
}>;

export type ForgotPasswordMutation = {
	__typename?: 'Mutation';
	forgotPassword: {
		__typename?: 'PasswordAuthResponse';
		success: boolean;
		errors?: Array<{
			__typename?: 'FieldError';
			field: string;
			message: string;
		}> | null;
	};
};

export type LogInMutationVariables = Exact<{
	credentials: LoginInput;
}>;

export type LogInMutation = {
	__typename?: 'Mutation';
	login: {
		__typename?: 'UserResponse';
		errors?: Array<{
			__typename?: 'FieldError';
			field: string;
			message: string;
		}> | null;
		user?: {
			__typename?: 'User';
			id: number;
			username: string;
			email: string;
		} | null;
	};
};

export type LogOutMutationVariables = Exact<{ [key: string]: never }>;

export type LogOutMutation = { __typename?: 'Mutation'; logout: boolean };

export type SignUpMutationVariables = Exact<{
	credentials: SignUpInput;
}>;

export type SignUpMutation = {
	__typename?: 'Mutation';
	signUp: {
		__typename?: 'UserResponse';
		errors?: Array<{
			__typename?: 'FieldError';
			field: string;
			message: string;
		}> | null;
		user?: {
			__typename?: 'User';
			id: number;
			username: string;
			email: string;
		} | null;
	};
};

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = {
	__typename?: 'Query';
	getUser?: {
		__typename?: 'User';
		id: number;
		username: string;
		email: string;
	} | null;
};

export type PostsQueryVariables = Exact<{
	input: GetPostsInput;
}>;

export type PostsQuery = {
	__typename?: 'Query';
	posts: {
		__typename?: 'PostsResponse';
		error?: string | null;
		posts: Array<{
			__typename?: 'Post';
			id: number;
			title: string;
			createdAt: any;
			updatedAt: any;
			text: string;
			users: {
				__typename?: 'User';
				username: string;
				email: string;
				id: number;
			};
		}>;
	};
};

export const UserFragmentFragmentDoc = gql`
	fragment UserFragment on User {
		id
		username
		email
	}
`;
export const ChangePasswordDocument = gql`
	mutation ChangePassword($credentials: ChangePasswordInput!) {
		changePassword(credentials: $credentials) {
			errors {
				field
				message
			}
			user {
				id
				email
				username
			}
		}
	}
`;

export function useChangePasswordMutation() {
	return Urql.useMutation<
		ChangePasswordMutation,
		ChangePasswordMutationVariables
	>(ChangePasswordDocument);
}
export const CreatePostDocument = gql`
	mutation CreatePost($input: PostInput!) {
		create(input: $input) {
			post {
				id
				createdAt
				updatedAt
				title
				text
				points
				users {
					id
					email
					username
				}
			}
			error
		}
	}
`;

export function useCreatePostMutation() {
	return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(
		CreatePostDocument,
	);
}
export const ForgotPasswordDocument = gql`
	mutation ForgotPassword($email: String!) {
		forgotPassword(email: $email) {
			errors {
				field
				message
			}
			success
		}
	}
`;

export function useForgotPasswordMutation() {
	return Urql.useMutation<
		ForgotPasswordMutation,
		ForgotPasswordMutationVariables
	>(ForgotPasswordDocument);
}
export const LogInDocument = gql`
	mutation LogIn($credentials: LoginInput!) {
		login(credentials: $credentials) {
			errors {
				field
				message
			}
			user {
				...UserFragment
			}
		}
	}
	${UserFragmentFragmentDoc}
`;

export function useLogInMutation() {
	return Urql.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument);
}
export const LogOutDocument = gql`
	mutation LogOut {
		logout
	}
`;

export function useLogOutMutation() {
	return Urql.useMutation<LogOutMutation, LogOutMutationVariables>(
		LogOutDocument,
	);
}
export const SignUpDocument = gql`
	mutation SignUp($credentials: SignUpInput!) {
		signUp(credentials: $credentials) {
			errors {
				field
				message
			}
			user {
				...UserFragment
			}
		}
	}
	${UserFragmentFragmentDoc}
`;

export function useSignUpMutation() {
	return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(
		SignUpDocument,
	);
}
export const GetUserDocument = gql`
	query getUser {
		getUser {
			...UserFragment
		}
	}
	${UserFragmentFragmentDoc}
`;

export function useGetUserQuery(
	options?: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>,
) {
	return Urql.useQuery<GetUserQuery, GetUserQueryVariables>({
		query: GetUserDocument,
		...options,
	});
}
export const PostsDocument = gql`
	query Posts($input: GetPostsInput!) {
		posts(input: $input) {
			posts {
				id
				title
				createdAt
				updatedAt
				text
				users {
					username
					email
					id
				}
			}
			error
		}
	}
`;

export function usePostsQuery(
	options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>,
) {
	return Urql.useQuery<PostsQuery, PostsQueryVariables>({
		query: PostsDocument,
		...options,
	});
}
import { IntrospectionQuery } from 'graphql';
export default {
	__schema: {
		queryType: {
			name: 'Query',
		},
		mutationType: {
			name: 'Mutation',
		},
		subscriptionType: null,
		types: [
			{
				kind: 'OBJECT',
				name: 'FieldError',
				fields: [
					{
						name: 'field',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'message',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
				],
				interfaces: [],
			},
			{
				kind: 'OBJECT',
				name: 'Mutation',
				fields: [
					{
						name: 'changePassword',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'OBJECT',
								name: 'UserResponse',
								ofType: null,
							},
						},
						args: [
							{
								name: 'credentials',
								type: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'SCALAR',
										name: 'Any',
									},
								},
							},
						],
					},
					{
						name: 'create',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'OBJECT',
								name: 'PostResponse',
								ofType: null,
							},
						},
						args: [
							{
								name: 'input',
								type: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'SCALAR',
										name: 'Any',
									},
								},
							},
						],
					},
					{
						name: 'forgotPassword',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'OBJECT',
								name: 'PasswordAuthResponse',
								ofType: null,
							},
						},
						args: [
							{
								name: 'email',
								type: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'SCALAR',
										name: 'Any',
									},
								},
							},
						],
					},
					{
						name: 'login',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'OBJECT',
								name: 'UserResponse',
								ofType: null,
							},
						},
						args: [
							{
								name: 'credentials',
								type: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'SCALAR',
										name: 'Any',
									},
								},
							},
						],
					},
					{
						name: 'logout',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'removeUser',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'OBJECT',
								name: 'User',
								ofType: null,
							},
						},
						args: [
							{
								name: 'id',
								type: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'SCALAR',
										name: 'Any',
									},
								},
							},
						],
					},
					{
						name: 'signUp',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'OBJECT',
								name: 'UserResponse',
								ofType: null,
							},
						},
						args: [
							{
								name: 'credentials',
								type: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'SCALAR',
										name: 'Any',
									},
								},
							},
						],
					},
					{
						name: 'updateUser',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'OBJECT',
								name: 'User',
								ofType: null,
							},
						},
						args: [
							{
								name: 'updateUserInput',
								type: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'SCALAR',
										name: 'Any',
									},
								},
							},
						],
					},
				],
				interfaces: [],
			},
			{
				kind: 'OBJECT',
				name: 'PasswordAuthResponse',
				fields: [
					{
						name: 'errors',
						type: {
							kind: 'LIST',
							ofType: {
								kind: 'NON_NULL',
								ofType: {
									kind: 'OBJECT',
									name: 'FieldError',
									ofType: null,
								},
							},
						},
						args: [],
					},
					{
						name: 'success',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
				],
				interfaces: [],
			},
			{
				kind: 'OBJECT',
				name: 'Post',
				fields: [
					{
						name: 'createdAt',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'id',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'image',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'points',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'text',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'title',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'updatedAt',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'userId',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'users',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'OBJECT',
								name: 'User',
								ofType: null,
							},
						},
						args: [],
					},
					{
						name: 'voteStatus',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
				],
				interfaces: [],
			},
			{
				kind: 'OBJECT',
				name: 'PostResponse',
				fields: [
					{
						name: 'error',
						type: {
							kind: 'SCALAR',
							name: 'Any',
						},
						args: [],
					},
					{
						name: 'post',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'OBJECT',
								name: 'Post',
								ofType: null,
							},
						},
						args: [],
					},
				],
				interfaces: [],
			},
			{
				kind: 'OBJECT',
				name: 'PostsResponse',
				fields: [
					{
						name: 'error',
						type: {
							kind: 'SCALAR',
							name: 'Any',
						},
						args: [],
					},
					{
						name: 'posts',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'LIST',
								ofType: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'OBJECT',
										name: 'Post',
										ofType: null,
									},
								},
							},
						},
						args: [],
					},
				],
				interfaces: [],
			},
			{
				kind: 'OBJECT',
				name: 'Query',
				fields: [
					{
						name: 'getUser',
						type: {
							kind: 'OBJECT',
							name: 'User',
							ofType: null,
						},
						args: [],
					},
					{
						name: 'posts',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'OBJECT',
								name: 'PostsResponse',
								ofType: null,
							},
						},
						args: [
							{
								name: 'input',
								type: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'SCALAR',
										name: 'Any',
									},
								},
							},
						],
					},
					{
						name: 'user',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'OBJECT',
								name: 'User',
								ofType: null,
							},
						},
						args: [
							{
								name: 'email',
								type: {
									kind: 'NON_NULL',
									ofType: {
										kind: 'SCALAR',
										name: 'Any',
									},
								},
							},
						],
					},
				],
				interfaces: [],
			},
			{
				kind: 'OBJECT',
				name: 'User',
				fields: [
					{
						name: 'createdAt',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'email',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'id',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'updatedAt',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
					{
						name: 'username',
						type: {
							kind: 'NON_NULL',
							ofType: {
								kind: 'SCALAR',
								name: 'Any',
							},
						},
						args: [],
					},
				],
				interfaces: [],
			},
			{
				kind: 'OBJECT',
				name: 'UserResponse',
				fields: [
					{
						name: 'errors',
						type: {
							kind: 'LIST',
							ofType: {
								kind: 'NON_NULL',
								ofType: {
									kind: 'OBJECT',
									name: 'FieldError',
									ofType: null,
								},
							},
						},
						args: [],
					},
					{
						name: 'user',
						type: {
							kind: 'OBJECT',
							name: 'User',
							ofType: null,
						},
						args: [],
					},
				],
				interfaces: [],
			},
			{
				kind: 'SCALAR',
				name: 'Any',
			},
		],
		directives: [],
	},
} as unknown as IntrospectionQuery;

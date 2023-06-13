import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:5000/graphql',
	documents: 'src/graphql/**/*.graphql',
	generates: {
		'src/graphql/generated/graphql.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-urql',
				'urql-introspection',
			],
		},
	},
};

export default config;

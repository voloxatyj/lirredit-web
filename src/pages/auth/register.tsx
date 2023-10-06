import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { Title } from '../../components/Global/Title';
import { InputField } from '../../components/Global/InputField';
import { PageContentLayout } from '../../components/Layout/PageContentLayout';
import { useSignUpMutation } from '../../graphql/generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { urqlClient } from '../../utils/urqlClient';

const Register: React.FC = () => {
	const router = useRouter();
	const [, register] = useSignUpMutation();
	return (
		<PageContentLayout variant='small'>
			<Formik
				initialValues={{ username: '', password: '', email: '' }}
				onSubmit={async (values, { setErrors }): Promise<unknown> => {
					const response = await register({ credentials: values });

					if (response.data?.signUp.errors) {
						return setErrors(toErrorMap(response.data?.signUp.errors));
					}

					return router.push('/');
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Title text='Register' />
						<InputField
							name='username'
							placeholder='username'
							label='Username'
							styles={{ color: 'white' }}
						/>
						<Box mt={4}>
							<InputField
								name='email'
								styles={{ color: 'white' }}
								placeholder='email'
								label='Email'
							/>
						</Box>
						<Box mt={4}>
							<InputField
								name='password'
								placeholder='password'
								label='Password'
								type='password'
								styles={{ color: 'white' }}
							/>
						</Box>
						<Box mt={4} justifyContent={'center'} display={'flex'}>
							<Button
								mt={4}
								type='submit'
								isLoading={isSubmitting}
								colorScheme='teal'
							>
								register
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</PageContentLayout>
	);
};

export default withUrqlClient(urqlClient)(Register);

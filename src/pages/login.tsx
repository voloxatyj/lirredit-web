import {
	Box,
	Button,
	Checkbox,
	Link,
	Stack,
	useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { Title } from '../components/Global/Title';
import { InputField } from '../components/Global/InputField';
import { PageContentLayout } from '../components/Layout/PageContentLayout';
import { useLogInMutation } from '../graphql/generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { urqlClient } from '../utils/urqlClient';
import { ForgotPasswordModal } from '../components/Modals/ForgotPassword';
import { AlertMessage } from '../components/Global/AlertMessage';
import { useState } from 'react';

const VARIANT_COLOR = 'teal';

const LogIn: React.FC = () => {
	const router = useRouter();
	const [alert, setAlert] = useState({ alert: null, message: '' });
	const [, login] = useLogInMutation();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<PageContentLayout variant='small'>
				<Formik
					initialValues={{ usernameOrEmail: '', password: '' }}
					onSubmit={async (values, { setErrors }): Promise<unknown> => {
						const response = await login({ credentials: values });

						if (response.data?.login?.errors) {
							setAlert({
								...alert,
								message: response.data?.login?.errors[0]?.message,
							});
							return setErrors(toErrorMap(response.data.login.errors));
						}

						return router.push('/');
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<Title text='Log In' />
							<InputField
								name='usernameOrEmail'
								placeholder='Enter username or email'
								label='Username Or Email'
								styles={{ color: 'white' }}
							/>
							<Stack p={2} isInline justifyContent='space-between' mt={4}>
								<Box className='checkbox'>
									<Checkbox>Remember Me</Checkbox>
								</Box>
								<Box>
									<Link color={`${VARIANT_COLOR}.500`} onClick={onOpen}>
										Forgot your password?
									</Link>
								</Box>
							</Stack>
							<Box mt={4}>
								<InputField
									name='password'
									placeholder='Enter password'
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
									login
								</Button>
							</Box>
							<AlertMessage {...alert} />
						</Form>
					)}
				</Formik>
			</PageContentLayout>
			<ForgotPasswordModal
				text={'Forgot Password'}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</>
	);
};

export default withUrqlClient(urqlClient)(LogIn);

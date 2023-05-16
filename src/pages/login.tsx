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
import { Title } from '../components/Title';
import { InputField } from '../components/InputField';
import { PageContentLayout } from '../components/Layout/PageContentLayout';
import { useLogInMutation } from '../graphql/generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { urqlClient } from '../utils/urqlClient';
import { ForgotPasswordModal } from '../components/Modals/ForgotPassword';

const VARIANT_COLOR = 'teal';

const LogIn: React.FC = () => {
	const router = useRouter();
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
								placeholder='username or email'
								label='Username Or Email'
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
									placeholder='password'
									label='Password'
									type='password'
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

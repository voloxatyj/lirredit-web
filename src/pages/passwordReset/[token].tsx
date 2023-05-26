import { Button, Box } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { InputField } from '../../components/InputField';
import { PageContentLayout } from '../../components/Layout/PageContentLayout';
import { Title } from '../../components/Title';
import { urqlClient } from '../../utils/urqlClient';
import { useChangePasswordMutation } from '../../graphql/generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';

const ChangePassword: NextPage = () => {
	const [, changePassword] = useChangePasswordMutation();
	const router = useRouter();
	const token = router.query.token as string;
	return (
		<>
			<PageContentLayout variant='small'>
				<Formik
					initialValues={{ password: '' }}
					onSubmit={async (values, { setErrors }): Promise<unknown> => {
						const response = await changePassword({
							credentials: { password: values.password, token },
						});

						if (response.data?.changePassword?.errors) {
							return setErrors(toErrorMap(response.data.changePassword.errors));
						}

						return router.push('/');
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<Title text='Change Password' />
							<Box mt={4}>
								<InputField
									name='password'
									placeholder='new password'
									label='New Password'
									type='password'
								/>
							</Box>
							<Box mt={4} justifyContent={'center'} display={'flex'}>
								<Button
									w='6xl'
									mt={4}
									type='submit'
									isLoading={isSubmitting}
									colorScheme='teal'
								>
									change password
								</Button>
							</Box>
						</Form>
					)}
				</Formik>
			</PageContentLayout>
		</>
	);
};

export default withUrqlClient(urqlClient)(ChangePassword);

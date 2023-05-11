import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { Header } from '../components/Heading';
import { InputField } from '../components/InputField';
import { PageContentLayout } from '../components/Layout/PageContentLayout';
import { useSignUpMutation } from '../graphql/generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { urqlClient } from '../utils/urqlClient';

const Register: React.FC = () => {
  const router = useRouter();
  const [, register] = useSignUpMutation();
  return (
    <PageContentLayout variant='small'>
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={async (values, { setErrors }): Promise<unknown> => {
          const response = await register(values);

          if (response.data?.signUp.errors) {
            return setErrors(toErrorMap(response.data?.signUp.errors));
          }

          return router.push('/');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Header title='Register' />
            <InputField
              name='username'
              placeholder='username'
              label='Username'
            />
            <Box mt={4}>
              <InputField name='email' placeholder='email' label='Email' />
            </Box>
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

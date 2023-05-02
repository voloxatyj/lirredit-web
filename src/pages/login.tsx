import { Box, Button, Checkbox, Link, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import { PageContentLayout } from '../components/Layout/PageContentLayout';
import { Title } from '../components/Title';
import { useLogInMutation } from '../graphql/generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const VARIANT_COLOR = 'teal';

const LogIn: React.FC = () => {
  const [, login] = useLogInMutation();
  return (
    <PageContentLayout variant='small'>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);

          if (response.data?.login?.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Title title='Log In' />
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
                <Link color={`${VARIANT_COLOR}.500`}>
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
  );
};

export default LogIn;

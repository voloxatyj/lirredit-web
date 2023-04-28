import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useSignUpMutation } from '../graphql/generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const Register: React.FC = () => {
  const [, register] = useSignUpMutation();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);

          if (response.data?.signUp.errors) {
            setErrors(toErrorMap(response.data?.signUp.errors));
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
    </Wrapper>
  );
};

export default Register;

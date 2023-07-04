import React from 'react';
import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalOverlay,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { useCreatePostMutation } from '../../graphql/generated/graphql';
import { urqlClient } from '../../utils/urqlClient';
import { InputField } from '../InputField';
import { Title } from '../Title';

interface AddPostModalModalProps {
	text: string;
	isOpen: boolean;
	onClose: () => void;
}

const CreatePost: React.FC<AddPostModalModalProps> = ({
	text,
	isOpen,
	onClose,
}) => {
	const router = useRouter();
	const [, createPost] = useCreatePostMutation();

	return (
		<Modal isOpen={isOpen} onClose={() => onClose()}>
			<ModalOverlay />
			<ModalContent>
				<Title text={text} styles={{ mb: 0, mt: 5 }} />
				<ModalCloseButton mt={1} />
				<ModalBody pb={6} w={'100%'} textAlign='center'>
					<Formik
						initialValues={{ title: '', text: '' }}
						onSubmit={async (values) => {
							const response = await createPost({ input: values });

							if (!response.data?.create.error) {
								router.push('/');
							}
						}}
					>
						{({ isSubmitting }) => (
							<Form>
								<InputField
									style={{ color: 'black' }}
									name='title'
									placeholder='title'
									label='Title'
								/>
								<Box mt={4}>
									<InputField textarea name='text' label='Context' />
								</Box>
								<ModalFooter
									display='flex'
									justifyContent='space-around'
									mb={4}
								>
									<Button mt={4} type='submit' isLoading={isSubmitting}>
										Create Post
									</Button>
									<Button
										mt={4}
										onClick={() => {
											onClose();
										}}
									>
										Cancel
									</Button>
								</ModalFooter>
							</Form>
						)}
					</Formik>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default withUrqlClient(urqlClient, { ssr: false })(CreatePost);

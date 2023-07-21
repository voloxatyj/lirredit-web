import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useCallback, useMemo, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useCreatePostMutation } from '../../graphql/generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { urqlClient } from '../../utils/urqlClient';
import { InputField } from '../Global/InputField';
import { Spinner } from '../Global/Spinner';
import { Title } from '../Global/Title';

interface IAddPostModalModalProps {
	text: string;
	isOpen: boolean;
	onClose: () => void;
}

interface IUploadedImage {
	secure_url: string;
	public_id: string;
}

const CreatePost: React.FC<IAddPostModalModalProps> = ({
	text,
	isOpen,
	onClose,
}) => {
	const [alert, setAlert] = useState({ alert: null, message: '' });
	const [, createPost] = useCreatePostMutation();
	const [selectedImages, setSelectedImages] = useState<File[] | []>([]);
	const [uploadStatus, setUploadStatus] = useState<boolean>(false);
	const onDrop = useCallback(
		<T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
			acceptedFiles.forEach((file) => {
				setSelectedImages((prevState) => [...prevState, file]);
			});
		},
		[],
	);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.jpeg', '.png', '.jpg'],
		},
		maxFiles: 10,
	});

	const handleRemove = (event: MouseEvent) => {
		const removeImageId: number = +(event?.target as HTMLInputElement).alt;
		const newSelectedImages: File[] | [] = selectedImages.filter(
			(_, idx) => idx !== removeImageId,
		);
		setSelectedImages(newSelectedImages);
	};

	const style = useMemo(
		() => ({
			...(isDragAccept ? { borderColor: '#00e676' } : {}),
			...(isDragReject ? { borderColor: '#ff1744' } : {}),
		}),
		[isDragAccept, isDragReject],
	);

	return (
		<Modal isOpen={isOpen} onClose={() => onClose()}>
			<Spinner uploadStatus={uploadStatus} />
			<ModalOverlay />
			<ModalContent>
				<Title text={text} styles={{ mb: 0, mt: 5 }} />
				<ModalCloseButton mt={1} />
				<ModalBody pb={6} w={'100%'} textAlign='center'>
					<Formik
						initialValues={{ title: '', text: '' }}
						onSubmit={async (values, { setErrors }) => {
							setUploadStatus(true);
							const formData = new FormData();
							let uploadedImages: IUploadedImage[] | [] = [];

							if (selectedImages.length > 0) {
								selectedImages.forEach((image, idx) => {
									formData.append(`file-${idx}`, image);
								});

								const { data } = await axios.post(
									process.env.IMAGES_API as string,
									formData,
								);
								uploadedImages = [...data];
							}

							const response = await createPost({
								input: { ...values, images: uploadedImages },
							});

							if (response.data?.create?.errors) {
								setUploadStatus(false);
								setAlert({
									...alert,
									message: response.data?.create?.errors[0]?.message,
								});
								return setErrors(toErrorMap(response.data?.create.errors));
							}

							setUploadStatus(false);
							onClose();
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
								<Box mt={4}>
									<Box className='container'>
										<Box className='dropzone' {...getRootProps({ style })}>
											<input {...getInputProps()} />
											{isDragActive ? (
												<Text
													fontSize={18}
													fontWeight={'bold'}
													color={isDragReject ? '#ff1744' : '#3182ce'}
												>
													{isDragReject
														? 'Expected only .jpeg, .png, .jpg'
														: 'Drop file(s) here ...'}
												</Text>
											) : (
												<Text
													fontSize={18}
													fontWeight={'bold'}
													color={'#3182ce'}
												>
													Drag and drop file(s) here, or click to select files
												</Text>
											)}
										</Box>
										<Box className='post_images_container'>
											{selectedImages.length > 0 &&
												selectedImages.map((image, idx) => (
													<img
														src={`${URL.createObjectURL(image)}`}
														key={idx}
														alt={`${idx}`}
														onClick={(e) => handleRemove(e)}
													/>
												))}
											{<Spinner uploadStatus={uploadStatus} />}
										</Box>
									</Box>
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

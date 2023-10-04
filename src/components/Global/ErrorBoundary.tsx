import React, { useEffect } from 'react';
import Image from 'next/image';
import InternalError from '../../assets/something_went_wrong.svg';
import { PageContentLayout } from '../Layout/PageContentLayout';
import { Button } from '@chakra-ui/react';

export const ErrorBoundary = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<PageContentLayout>
			<div className='error_wrapper'>
				<Image className='error_image' src={InternalError} alt='' />
				<div className='error_title'>Whoops! Internal Error</div>
				<div className='error_text'>
					Something went wrong and we could not complete that request
				</div>
				<div className='error_wrapperButton'>
					<Button
						className='button'
						onClick={
							// Attempt to recover by trying to re-render the segment
							() => reset()
						}
					>
						Refresh
					</Button>
				</div>
			</div>
		</PageContentLayout>
	);
};

import React from 'react';
import { Portal } from './Portal';

export const Loader = () => (
	<Portal>
		<div className='wrapper'>
			<div className='slice' />
			<div className='slice' />
			<div className='slice' />
		</div>
	</Portal>
);

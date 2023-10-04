import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { Box, ColorModeScript } from '@chakra-ui/react';
import { Footer } from '../components/Footer/Footer';

export default class Document extends NextDocument {
	render() {
		return (
			<Html>
				<Head />
				<body>
					{/* Make Color mode to persists when you refresh the page. */}
					<ColorModeScript />
					<Box id='portal'></Box>
					<Main />
					<NextScript />
					<Footer />
				</body>
			</Html>
		);
	}
}

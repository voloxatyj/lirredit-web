import { ChakraProvider } from '@chakra-ui/react';
import '../styles/global.scss';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
	);
}

export default MyApp;

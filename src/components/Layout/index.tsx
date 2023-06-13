import React from 'react';
import { Footer } from '../Footer';
import Navbar from '../Navbar';

interface Props {
	children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<>
			<Navbar pageProps={'none'} />
			{children}
			<Footer />
		</>
	);
};

export default Layout;

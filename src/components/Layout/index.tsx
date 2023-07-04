import React from 'react';
import Navbar from '../Navbar';

interface Props {
	children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<>
			<Navbar pageProps={'none'} />
			{children}
		</>
	);
};

export default Layout;

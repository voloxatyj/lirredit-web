module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com'],
	},
	env: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		IMAGES_API: process.env.IMAGES_API,
	},
};

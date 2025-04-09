module.exports = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},
	images: {
		domains: ['www.holidify.com', 'res.cloudinary.com', 'cdn.example.org'], // Add as needed
	},
};

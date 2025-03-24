import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import '@/styles/globals.css';

export const metadata = {
	title: 'Ghaziabad Kali Bari Samity',
	description:
		'A spiritual and cultural destination for devotion, festivals, and community service.',
		icons: {
			icon: "/logo.svg", // Make sure the file exists in public/
		},
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="max-w-auto mx-auto">
				<Navbar />
				<main className="min-h-screen">{children}</main>
				<Footer />
			</body>
		</html>
	);
}

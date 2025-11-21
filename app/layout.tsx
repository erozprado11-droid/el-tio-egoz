import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import AgeModal from '@/components/AgeModal';
import { SearchProvider } from '@/context/SearchContext';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		default: 'El tío Egoz',
		template: '%s | El tío Egoz',
	},
	description:
		'Descubre y descarga los juegos más atrevidos e intensos para PC y Android. Actualizaciones frecuentes, comunidad activa y contenido sin filtros en El tío Egoz.',
	verification: {
		google: '2bdZM6yI2s7nsaWXWA7lY6nMRV90dPcGImdgJxaIsQQ',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<SearchProvider>
					<AgeModal />
					<Navbar />
					{children}
				</SearchProvider>
			</body>
		</html>
	);
}

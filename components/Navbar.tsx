'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearch } from '@/context/SearchContext';

// Array único de enlaces para navbar y sidebar
const navLinks = [
	{ label: 'Inicio', href: '/' },
	{ label: 'Donar', href: '/Donate' },
	{ label: 'Redes', href: '/social-networks', external: false },
	{ label: 'Contáctanos', href: '/contact' },
];

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { query, setQuery } = useSearch();

	// Toggle menu visibility on small screens
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Close menu when clicking outside of it
	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<div className='w-full bg-card'>
			<nav className='flex flex-row justify-between items-center px-4 py-2'>
				<div className=''>
					<Link
						href='/'
						className='flex items-center gap-2 text-white'
					>
						<Image
							src='/images/logo.webp'
							alt='logo el tio egoz'
							width={40} // tamaño base reducido
							height={40}
							className='rounded-full sm:w-10 sm:h-10 w-8 h-8'
						/>
						<span className='sm:text-2xl text-lg font-semibold'>
							<span className='sm:inline hidden text-nowrap'>El Tío Egoz</span>
							<span className='inline sm:hidden text-nowrap'>Tío Egoz</span>
						</span>
					</Link>
				</div>

				{/* Search bar */}
				<div className='flex items-center justify-center flex-1 mx-2'>
					<div className='relative w-full max-w-xs sm:max-w-sm'>
						<input
							type='text'
							placeholder='Buscar juegos...'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className='w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm sm:text-base text-foreground placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-gray-900 transition duration-200 shadow-sm'
						/>
						<span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2}
								stroke='currentColor'
								className='w-5 h-5'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z'
								/>
							</svg>
						</span>
					</div>
				</div>

				{/* Menú horizontal en desktop */}
				<ul className='hidden lg:flex flex-row gap-6 items-center text-white ml-4'>
					{navLinks.map((link, idx) =>
						link.external ? (
							<a
								key={idx}
								href={link.href}
								rel='noopener noreferrer'
								className='hover:underline'
							>
								{link.label}
							</a>
						) : (
							<li key={idx}>
								<Link
									href={link.href}
									className='hover:underline'
								>
									{link.label}
								</Link>
							</li>
						)
					)}
				</ul>

				{/* Toggle menu button for mobile */}
				<button
					className='lg:hidden text-white p-2'
					onClick={toggleMenu}
					aria-label='Abrir menú'
				>
					<span className='block w-6 h-0.5 bg-white mb-2'></span>
					<span className='block w-6 h-0.5 bg-white mb-2'></span>
					<span className='block w-6 h-0.5 bg-white'></span>
				</button>
			</nav>

			{/* Sidebar Menu for Mobile */}
			{/* Overlay */}
			<div
				className={`fixed inset-0 z-50 transition-all duration-300 ${
					isMenuOpen ? 'block' : 'hidden'
				}`}
				style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
			>
				{/* Fondo oscuro */}
				<div
					className='absolute inset-0 transition-opacity duration-300'
					style={{ background: 'rgba(0,0,0,0.5)' }}
					onClick={closeMenu}
				/>
				{/* Sidebar */}
				<aside
					className={`fixed left-0 top-0 w-64 h-full bg-card text-white p-4 z-50 transform transition-transform duration-300 ${
						isMenuOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
					style={{ boxShadow: '2px 0 8px rgba(0,0,0,0.2)' }}
				>
					{/* Botón de cerrar */}
					<button
						className='absolute top-4 right-4 text-white text-2xl'
						onClick={closeMenu}
						aria-label='Cerrar menú'
					>
						&times;
					</button>
					<ul className='space-y-4 mt-10'>
						<li>
							<Link
								href='/'
								className='hover:underline'
							>
								Inicio
							</Link>
						</li>
						<li>
							<Link
								href='/Donate'
								className='hover:underline'
								rel='noopener noreferrer'
							>
								Donar
							</Link>
						</li>
						<li>
							<a
								href='/social-networks'
								rel='noopener noreferrer'
								className='hover:underline'
							>
								Redes
							</a>
						</li>
						<li>
							<Link
								href='/contact'
								className='hover:underline'
								rel='noopener noreferrer'
							>
								Contáctanos
							</Link>
						</li>
						{navLinks.map((link, idx) =>
							link.external ? (
								<a
									key={idx}
									href={link.href}
									rel='noopener noreferrer'
									className='hover:underline block'
								>
									{link.label}
								</a>
							) : (
								<li key={idx}>
									<Link
										href={link.href}
										className='hover:underline block'
									>
										{link.label}
									</Link>
								</li>
							)
						)}
					</ul>
				</aside>
			</div>
		</div>
	);
}

export default Navbar;
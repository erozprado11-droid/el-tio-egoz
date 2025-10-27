'use client';

import { useEffect, useState } from 'react';
import ImageSlider from '@/components/UI/ImageSlider';
import { useSearch } from '@/context/SearchContext';
import Link from 'next/link';
import { Item } from '@/types';

export default function Dashboard({ filters }: { filters: { order: string } }) {
	const [data, setData] = useState<Item[]>([]);
	const [loading, setLoading] = useState(true);
	const { query } = useSearch();

	useEffect(() => {
		async function fetchItems() {
			try {
				const res = await fetch('/api/game/get');
				const items = await res.json();
				setData(items);
			} catch (err) {
				console.error('Error al obtener los items:', err);
			} finally {
				setLoading(false);
			}
		}
		fetchItems();
	}, []);

	// Filtrado por búsqueda
	let filteredGames = data.filter((game) =>
		game.title.toLowerCase().includes(query.toLowerCase())
	);

	// Ordenamiento
	if (filters?.order) {
		switch (filters.order) {
			case 'newest':
				filteredGames = [...filteredGames].sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
				break;
			case 'oldest':
				filteredGames = [...filteredGames].sort(
					(a, b) =>
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
				);
				break;
			case 'alphabetical':
				filteredGames = [...filteredGames].sort((a, b) =>
					a.title.localeCompare(b.title)
				);
				break;
			case 'likes':
				filteredGames = [...filteredGames].sort((a, b) => b.likes - a.likes);
				break;
			default:
				break;
		}
	}

	if (loading) return <p className='mx-auto text-center'>Cargando lujurias... ❤</p>;

	return (
		<div className='max-w-7xl 2xl:max-w-screen-2xl mx-auto px-5 sm:px-10 py-5 sm:py-10'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 xl:gap-6'>
				{filteredGames.map((item) => (
					<div
						key={item.id}
						className='bg-card rounded-lg flex flex-col justify-between shadow-lg hover:shadow-xl transform transition-transform duration-300 ease-in-out
						hover:scale-[1.03]'
					>
						<ImageSlider
							images={item.images}
							height='h-52 sm:h-56 md:h-64 lg:h-72'
						/>
						<Link
							href={`/game/${item.id}`}
							className='flex flex-col p-2 sm:px-4 md:px-0'
						>
							<h2 className='text-base text-heading font-semibold mb-1 px-0 sm:px-2 line-clamp-1'>
								{item.title}
							</h2>
							<p className='text-text-secondary px-0 sm:px-2 mt-1 sm:mt-2 line-clamp-2 text-xs sm:text-base'>
								{item.description}
							</p>
							<div className='flex flex-row justify-between gap-1 sm:gap-2 mt-1 sm:mt-3 px-0 sm:px-2'>
								<p className='text-xs sm:text-sm text-gray-500'>
									Likes: {item.likes}
								</p>
								<p className='text-xs sm:text-sm text-gray-500'>
									Fecha: {new Date(item.createdAt).toLocaleDateString()}
								</p>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

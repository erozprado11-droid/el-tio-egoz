'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Item } from '@/types';
import ImageSlider from '@/components/UI/ImageSlider';

const GameDetails = () => {
	const [item, setItem] = useState<Item | null>(null);
	const [loading, setLoading] = useState(true);

	const params = useParams();
	const id = params?.id as string;

	useEffect(() => {
		async function fetchItem() {
			try {
				const res = await fetch('/api/game/get');
				const items = await res.json();
				const found = items.find((i: Item) => i.id === id);
				setItem(found || null);
			} catch (err) {
				console.error('Error al obtener el item:', err);
			} finally {
				setLoading(false);
			}
		}
		if (id) fetchItem();
	}, [id]);

	if (loading) return <p className='mx-auto text-center'>Cargando juego por favor espere...</p>;
	if (!item) return <p className='mx-auto text-center'>Juego no encontrado.</p>;

	return (
		<div className='max-w-7xl mx-auto px-2 sm:px-4 py-6'>
			<div className='max-w-3xl mx-auto bg-card rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-4 sm:p-8'>
				<h1 className='text-3xl sm:text-4xl font-extrabold text-heading mb-2 sm:mb-4 tracking-tight'>
					{item.title}
				</h1>
				<div className='mb-4'>
					<ImageSlider
						images={item.images}
						height='h-48 sm:h-72 md:h-96'
					/>
				</div>
				<p className='text-text-secondary text-base sm:text-lg mb-6'>
					{item.description}
				</p>
				<hr className='my-4 border-t border-gray-200 dark:border-gray-700' />
				<h2 className='text-xl font-bold text-heading mb-2'>
					Detalles del juego
				</h2>
				{/* Informacion Básica */}
				{item.basicInformation && (
					<div className='mb-4'>
						<h3 className='text-lg font-semibold text-foreground mb-2'>
							Información Básica
						</h3>
						<div className='flex flex-wrap gap-2'>
							{item.basicInformation.map((info, index) => (
								<div
									key={index}
									className='bg-footer-bg text-footer-text px-3 py-2 rounded-lg text-xs sm:text-sm font-medium shadow flex items-center'
								>
									{info}
								</div>
							))}
						</div>
					</div>
				)}
				{/* Características */}
				{item.details && (
					<div className='mb-4'>
						<h3 className='text-lg font-semibold text-foreground mb-2'>
							Características
						</h3>
						<div className='flex flex-wrap gap-2'>
							{item.details.map((detail, index) => (
								<div
									key={index}
									className='bg-btn text-footer-text px-3 py-2 rounded-lg text-xs sm:text-sm font-medium shadow flex items-center'
								>
									{detail}
								</div>
							))}
						</div>
					</div>
				)}
				{/* Plataformas */}
				<div className='mb-4'>
					<h3 className='text-lg font-semibold text-foreground mb-2'>
						Plataformas Disponibles
					</h3>
					<div className='flex flex-wrap gap-2'>
						{item.linkAndroid && (
							<div className='bg-link text-footer-text px-3 py-2 rounded-lg text-xs sm:text-sm font-medium shadow flex items-center'>
								Android
							</div>
						)}
						{item.linkMac && (
							<div className='bg-link text-footer-text px-3 py-2 rounded-lg text-xs sm:text-sm font-medium shadow flex items-center'>
								Mac
							</div>
						)}
						{item.linkWindows && (
							<div className='bg-link text-footer-text px-3 py-2 rounded-lg text-xs sm:text-sm font-medium shadow flex items-center'>
								Windows
							</div>
						)}
						{item.linkIos && (
							<div className='bg-link text-footer-text px-3 py-2 rounded-lg text-xs sm:text-sm font-medium shadow flex items-center'>
								iOS
							</div>
						)}
					</div>
				</div>
				<hr className='my-4 border-t border-gray-200 dark:border-gray-700' />
				<h2 className='text-xl font-bold text-heading mb-2'>Descárgalo aquí</h2>
				<div className='flex flex-row flex-wrap gap-2'>
					{item.linkAndroid && (
						<a
							href={item.linkAndroid}
							className='bg-link hover:bg-link-hover text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors text-center'
							target='_blank'
							rel='noopener noreferrer'
						>
							Descargar para Android
						</a>
					)}
					{item.linkMac && (
						<a
							href={item.linkMac}
							className='bg-link hover:bg-link-hover text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors text-center'
							target='_blank'
							rel='noopener noreferrer'
						>
							Descargar para Mac
						</a>
					)}
					{item.linkWindows && (
						<a
							href={item.linkWindows}
							className='bg-link hover:bg-link-hover text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors text-center'
							target='_blank'
							rel='noopener noreferrer'
						>
							Descargar para Windows
						</a>
					)}
					{item.linkIos && (
						<a
							href={item.linkIos}
							className='bg-link hover:bg-link-hover text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors text-center'
							target='_blank'
							rel='noopener noreferrer'
						>
							Descargar para iOS
						</a>
					)}
				</div>
				{/* Likes y Fecha */}
				<div className='flex flex-row justify-between items-center mt-6 text-xs text-text-secondary'>
					<span>👍 {item.likes} Likes</span>
					<span>
						Publicado: {new Date(item.createdAt).toLocaleDateString()}
					</span>
				</div>
			</div>
		</div>
	);
};

export default GameDetails;

'use client';
import React, { useEffect, useRef, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import Hero from '@/components/Hero';
import SidebarFilters from '@/components/SidebarFilters';

export default function Home() {
	const [filters, setFilters] = useState<{ order: string }>({
		order: 'newest',
	});
	const [showFilters, setShowFilters] = useState(false);
	const currentBuildId = useRef<string | null>(null);

	useEffect(() => {
		async function checkVersion() {
			try {
				const res = await fetch('/api/version');
				const { buildId } = await res.json();
				if (!currentBuildId.current) {
					currentBuildId.current = buildId;
				} else if (currentBuildId.current !== buildId) {
					// Nueva versión detectada, recarga la página
					window.location.reload();
				}
			} catch {
				// Ignorar errores de red
			}
		}
		const interval = setInterval(checkVersion, 60000); // cada 60 segundos
		return () => clearInterval(interval);
	}, []);

	return (
		<div className='flex flex-col'>
			<Hero />
			{/* Botón para mostrar filtros solo en móvil */}
			<div className='block lg:hidden mb-2 px-2'>
				<button
					onClick={() => setShowFilters((v) => !v)}
					className='bg-[#181c24] text-[#ffb300] font-semibold px-4 py-2 rounded-lg shadow transition hover:bg-[#23283a] w-full'
				>
					{showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
				</button>
			</div>
			<div className='flex flex-col lg:flex-row gap-4 w-full'>
				{/* Filtros: ocultos en móvil si showFilters es false, siempre visibles en escritorio */}
				<div
					className={`w-full lg:w-auto ${showFilters ? '' : 'hidden'} lg:block`}
				>
					<SidebarFilters onFilterChange={setFilters} />
				</div>
				<div className='flex-1'>
					<Dashboard filters={filters} />
				</div>
			</div>
		</div>
	);
}

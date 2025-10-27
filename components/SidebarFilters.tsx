'use client';
import React, { useState } from 'react';

const orderOptions = [
	{ label: 'Más nuevos', value: 'newest' },
	{ label: 'Más viejos', value: 'oldest' },
	{ label: 'Alfabético', value: 'alphabetical' },
	{ label: 'Más likes', value: 'likes' },
];

export default function SidebarFilters({
	onFilterChange,
}: {
	onFilterChange?: (filters: { order: string }) => void;
}) {
	const [order, setOrder] = useState('newest');

	const handleOrderChange = (value: string) => {
		setOrder(value);
		triggerChange({ order: value });
	};

	const triggerChange = (filters: { order: string }) => {
		if (onFilterChange) onFilterChange(filters);
	};

	return (
		<aside className='w-full md:mt-6 lg:w-[240px] bg-[#181c24] rounded-2xl p-6 shadow-2xl text-white font-sans mb-4 lg:mb-0'>
			<h3 className='text-[22px] mb-5 text-[#ffb300] tracking-wider flex items-center'>
				<span
					role='img'
					aria-label='joystick'
					className='mr-2'
				>
					🎮
				</span>
				Filtros
			</h3>
			<div className='mb-6'>
				<div className='font-semibold mb-2'>Ordenar por</div>
				{orderOptions.map((opt) => (
					<label
						key={opt.value}
						className={`flex items-center cursor-pointer mb-1.5 rounded-lg px-2 py-1 transition-colors duration-200 ${
							order === opt.value ? 'bg-[#23283a]' : ''
						}`}
					>
						<input
							type='radio'
							name='order'
							value={opt.value}
							checked={order === opt.value}
							onChange={() => handleOrderChange(opt.value)}
							className='accent-[#ffb300] mr-2'
						/>
						{opt.label}
					</label>  //Si lees esto mi idea para el apartado de Tags era algo asi
							// Tenemos en la base de datos "Games" y este contiene "12" (creo) lineas
							// en esas 12 lineas esta "details", yo queria extraer de ahí todas las "tags" pero no funcionó.
							// Entonces la nueva idea es que si puedes crear una parte donde se dejen algunas tags así como
							// en filtros, seria de mucha ayuda... Att Eroz.
				))} 
			</div>
		</aside>
	);
}
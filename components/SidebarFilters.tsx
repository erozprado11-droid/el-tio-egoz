'use client';
import React, { useState, useEffect } from 'react';

// Lista de Opciones de Orden (sin cambios)
const orderOptions = [
	{ label: 'Aleatorio', value: 'random' },
	{ label: 'Más nuevos', value: 'newest' },
	{ label: 'Más viejos', value: 'oldest' },
	{ label: 'Alfabético', value: 'alphabetical' },
	{ label: 'Más likes', value: 'likes' },
];

// NUEVA LISTA: Plataformas fijas
const platforms = ['Windows', 'Android'];

// Tags fijas (sin cambios)
const sampleTags = [
	'2D',
	'Romance',
	'Aventura',
	'Acción',
	'RPG',
	'Estrategia',
	'Indie',
	'Simulación',
];

// DEFINICIÓN DE TIPOS ACTUALIZADA
interface Filters {
    order: string;
    tags: string[];
    platforms: string[]; // NUEVO: Campo para plataformas
}

export default function SidebarFilters({
	onFilterChange,
}: {
	onFilterChange?: (filters: Filters) => void;
}) {
	const [order, setOrder] = useState('random');
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
    // NUEVO ESTADO: Para guardar las plataformas seleccionadas
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]); // <-- AÑADIR ESTA LÍNEA

	// Función que consolida todos los filtros y llama a la función principal (ACTUALIZADA)
    const triggerChange = (
        newOrder: string = order, 
        newTags: string[] = selectedTags, 
        newPlatforms: string[] = selectedPlatforms // <-- MODIFICAR: Incluir newPlatforms
    ) => {
        const filters: Filters = { 
            order: newOrder, 
            tags: newTags,
            platforms: newPlatforms // <-- MODIFICAR: Asignar platforms
        };
        if (onFilterChange) onFilterChange(filters);
    };

	const handleOrderChange = (value: string) => {
		setOrder(value);
		triggerChange(value, selectedTags, selectedPlatforms); // <-- MODIFICAR
	};
    
    const handleTagChange = (tag: string, isChecked: boolean) => {
        let newTags;
        
        if (isChecked) {
            newTags = [...selectedTags, tag];
        } else {
            newTags = selectedTags.filter((t) => t !== tag);
        }
        
        setSelectedTags(newTags);
        triggerChange(order, newTags, selectedPlatforms);
    };

    // NUEVA FUNCIÓN: Maneja la selección/deselección de plataformas
    const handlePlatformChange = (platform: string, isChecked: boolean) => { // <-- AÑADIR ESTA FUNCIÓN
        let newPlatforms;
        
        if (isChecked) {
            newPlatforms = [...selectedPlatforms, platform];
        } else {
            newPlatforms = selectedPlatforms.filter((p) => p !== platform);
        }
        
        setSelectedPlatforms(newPlatforms);
        // Propaga el cambio de plataformas manteniendo el orden y las tags actuales
        triggerChange(order, selectedTags, newPlatforms);
    };

	// Enviar los valores por defecto ('random', [], []) al cargar.
    useEffect(() => {
        triggerChange('random', [], []); // <-- MODIFICAR: Añadir [] para platforms
    }, []);

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
            
            {/* SECCIÓN DE ORDENAR POR (sin cambios) */}
			<div className='mb-6'>
				<div className='font-semibold mb-2 text-lg border-b border-[#23283a] pb-1'>Ordenar por</div>
				{orderOptions.map((opt) => (
					<label
						key={opt.value}
						className={`flex items-center cursor-pointer mb-1.5 rounded-lg px-2 py-1 transition-colors duration-200 ${
							order === opt.value ? 'bg-[#23283a] font-medium' : 'hover:bg-[#23283a]/50'
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
					</label> 
				))} 
			</div>
            
            <hr className='border-[#23283a] my-4'/>

            {/* NUEVA SECCIÓN: FILTRO POR PLATAFORMAS */}
            <div className='mb-6'>
                <div className='font-semibold mb-2 text-lg border-b border-[#23283a] pb-1'>Plataformas ({selectedPlatforms.length} seleccionada/s)</div>
                <div className='space-y-1'>
                    {platforms.map((platform) => (
                        <label
                            key={platform}
                            className={`flex items-center cursor-pointer rounded-lg px-2 py-1 transition-colors duration-200 ${
                                selectedPlatforms.includes(platform) ? 'bg-[#23283a] font-medium' : 'hover:bg-[#23283a]/50'
                            }`}
                        >
                            <input
                                type='checkbox'
                                name='platform-filter'
                                value={platform}
                                checked={selectedPlatforms.includes(platform)}
                                onChange={(e) => handlePlatformChange(platform, e.target.checked)}
                                className='accent-[#ffb300] mr-2'
                            />
                            {platform}
                        </label>
                    ))}
                </div>
            </div>

            <hr className='border-[#23283a] my-4'/>
            
            {/* SECCIÓN DE FILTRO POR TAGS (sin cambios en el cuerpo) */}
            <div className='mb-6'>
                <div className='font-semibold mb-2 text-lg border-b border-[#23283a] pb-1'>Tags ({selectedTags.length} seleccionada/s)</div>
                <div className='space-y-1'>
                    {sampleTags.map((tag) => (
                        <label
                            key={tag}
                            className={`flex items-center cursor-pointer rounded-lg px-2 py-1 transition-colors duration-200 ${
                                selectedTags.includes(tag) ? 'bg-[#23283a] font-medium' : 'hover:bg-[#23283a]/50'
                            }`}
                        >
                            <input
                                type='checkbox'
                                name='tag-filter'
                                value={tag}
                                checked={selectedTags.includes(tag)}
                                onChange={(e) => handleTagChange(tag, e.target.checked)}
                                className='accent-[#ffb300] mr-2'
                            />
                            {tag}
                        </label>
                    ))}
                </div>
            </div>
		</aside>
	);
}
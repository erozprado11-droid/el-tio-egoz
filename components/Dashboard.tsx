'use client';

import { useEffect, useState, useMemo } from 'react';
import ImageSlider from '@/components/UI/ImageSlider';
import { useSearch } from '@/context/SearchContext';
import Link from 'next/link';
import { Item } from '@/types';

interface Filters {
    order: string;
    tags: string[];
    platforms: string[];
}

const ITEMS_PER_PAGE = 12;

// Función para ordenar el array de manera aleatoria (shuffle)
// Usamos el algoritmo de Fisher-Yates para asegurar una buena distribución.
const shuffleArray = (array: Item[]) => {
    // Es crucial crear una copia para no mutar el estado original de React ni el array filtrado.
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// CAMBIO: La definición de `filters` incluye `tags: string[]`
export default function Dashboard({ filters }: { filters: { order: string, tags: string[], platforms: string[] } }) {    
    const [data, setData] = useState<Item[]>([]);
	const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const { query } = useSearch();

    // Cargar datos (Sin cambios)
    useEffect(() => {
        async function fetchItems() {
            try {
                const res = await fetch('/api/game/get');
                const items = await res.json();
                setData(items);
                setCurrentPage(1);
            } catch (err) {
                console.error('Error al obtener los items:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchItems();
    }, []);

    const filteredGames = useMemo(() => {
        // 1. FILTRADO INICIAL (Búsqueda por título)
        let filtered = data.filter((game) =>
            game.title.toLowerCase().includes(query.toLowerCase())
        );
        
        // 2. FILTRADO POR TAGS (Busca las tags en el campo `details`)
        const selectedTags = filters?.tags || [];
        const selectedPlatforms = filters?.platforms || [];

        if (selectedPlatforms.length > 0) { // <-- AÑADIR TODO ESTE BLOQUE DE LÓGICA
            filtered = filtered.filter((game) => {
                // Un juego pasa el filtro si tiene AL MENOS UNA de las plataformas seleccionadas
                return selectedPlatforms.some((platform) => {
                    const linkKey = `link${platform}`; // Construye el nombre de la propiedad: linkWindows, linkAndroid, etc.

                    // Comprueba si el juego tiene la propiedad Y si esa propiedad NO está vacía.
                    const link = game[linkKey as keyof Item];
                    return typeof link === 'string' && link.trim() !== '';
                });
            });
        }


        if (selectedTags.length > 0) {
            filtered = filtered.filter((game) => {
                // Hubo un error aquí
            const detailsText = String(game.details || ""); 
                
                // 2. PREPARACIÓN DEL TEXTO (todo minúsculas y reemplazar saltos de línea)
                // Se usa el split().join() como una alternativa simple a replace()
                const gameDetails = detailsText
                    .toLowerCase()
                    .split('\n') // Divide por salto de línea
                    .join(' ')   // Une con un espacio
                    .split('\r') // Vuelve a dividir por retorno de carro (por si acaso)
                    .join(' ');  // Vuelve a unir con un espacio
                
                // 3. Lógica de Filtrado (Sin cambios)
                return selectedTags.every((tag) => 
                    gameDetails.includes(tag.toLowerCase())
                );
            });
        }
        // FIN DEL FILTRO POR TAGS

        // 3. APLICACIÓN DEL ORDENAMIENTO
        const order = filters?.order || 'random'; // Establece 'random' como orden por defecto

        switch (order) {
            case 'newest':
                filtered = [...filtered].sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                break;
            case 'oldest':
                filtered = [...filtered].sort(
                    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );
                break;
            case 'alphabetical':
                filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'likes':
                filtered = [...filtered].sort((a, b) => b.likes - a.likes);
                break;
            case 'random': // Caso para orden aleatorio
                filtered = shuffleArray(filtered);
                break;
            default:
                // Si el filtro no es válido, por defecto sigue el orden aleatorio.
                filtered = shuffleArray(filtered); 
                break;
        }

        return filtered;
    }, [data, query, filters?.order, filters?.tags, filters?.platforms]); // CAMBIO: Añadido `filters?.tags` a las dependencias

    // ... (El resto del código de useEffect, paginación y renderizado HTML permanece igual) ...
    
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredGames.length]); 


    // Lógica para las pinches paginas en HTML era más facil...
    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const gamesToShow = filteredGames.slice(startIndex, endIndex);

    // Función para cambiar de página
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Función para generar los números del paginador
    const getPaginationNumbers = () => {
        const pages: (number | '...')[] = [];
        const maxPagesToShow = 7; 

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Lógica para mostrar puntos suspensivos (...)
            const startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2) + 1);
            const endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPagesToShow / 2) - 1);

            pages.push(1); 

            if (startPage > 2) {
                pages.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                if (i > 1 && i < totalPages) {
                    pages.push(i);
                }
            }

            if (endPage < totalPages - 1) {
                pages.push('...');
            }

            if (totalPages > 1) {
                pages.push(totalPages); 
            }
        }

        if (!pages.includes(currentPage) && currentPage > 1 && currentPage < totalPages) {
            pages.splice(pages.indexOf('...'), 0, currentPage);
        }

        return [...new Set(pages)]; 
    };


    if (loading) return <p className='mx-auto text-center'>Cargando lujurias... Mmm❤</p>;
    if (filteredGames.length === 0) return <p className='mx-auto text-center'>No se encontraron publicaciones.</p>;

    return (
        <div className='max-w-7xl 2xl:max-w-screen-2xl mx-auto px-5 sm:px-10 py-5 sm:py-10'>
            {/* Grid de Publicaciones */} 
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 xl:gap-6'>
                {gamesToShow.map((item) => (
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

            {/* 4. Renderizado del Paginador */}
            {totalPages > 1 && (
                <div className='flex justify-center items-center mt-10 text-lg'>
                    <div className='flex items-center space-x-2 sm:space-x-4'>
                        {/* Botón Anterior */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`text-blue-400 ${
                                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-600'
                            }`}
                        >
                            &lt; Anterior
                        </button>

                        {/* Numeros de Pagina */}
                        {getPaginationNumbers().map((page, index) => (
                            <span key={index}>
                                {page === '...' ? (
                                    <span className='text-gray-400 mx-1'>...</span>
                                ) : (
                                    <button
                                        onClick={() => handlePageChange(page as number)}
                                        className={`px-2 py-1 rounded-full text-base transition-colors duration-200 ${
                                            page === currentPage
                                                ? 'bg-blue-600 text-white font-bold' // Estilo para página activa
                                                : 'text-blue-400 hover:bg-gray-700 hover:text-blue-300' // Estilo para otras páginas
                                        }`}
                                    >
                                        {page}
                                    </button>
                                )}
                            </span>
                        ))}

                        {/* Botón Siguiente */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`text-blue-400 ${
                                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-600'
                            }`}
                        >
                            Siguiente &gt;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
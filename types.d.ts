export interface Item {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    likes: number;
    images: string[];

    // --- PROPIEDADES QUE CAUSAN EL ERROR ---
    // Deben ser opcionales (?) o permitir null | undefined, y son cadenas de texto.
    basicInformation?: string[] | null; // AHORA ES UN ARRAY DE STRINGS (o null)
    details?: string[] | null;          // Cambiar a 'string | null' o hacerlo opcional
    
    // --- PROPIEDADES DE PLATAFORMA ---
    // Asegúrate de que las propiedades usadas para el filtro también permitan null o sean opcionales.
    linkAndroid?: string | null;
    linkWindows?: string | null;
    linkMac?: string | null;
    linkIos?: string | null;
}

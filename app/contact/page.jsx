import React from 'react';
import { Mail, Clock } from 'lucide-react';

/**
 * Componente de la tarjeta de Atención al Cliente ("Contacta con nosotros").
 */
const CustomerServiceCard = () => {
  // Enlaces y mensajes. Puedes cambiar 'url' al enlace de contacto real.
  const contactUrl = "#"; 
  // URL de la imagen del logo del Tío Egoz (Reemplaza esta URL por la URL real de tu imagen)
  const logoImage = "https://placehold.co/80x80/0d47a1/FFFFFF?text=LOGO"; 

  return (
    // Contenedor principal para centrar la tarjeta y darle un fondo.
    // Usamos el mismo fondo gris oscuro (slate-900) que en el componente anterior para consistencia.
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-8 font-sans">
      
      {/* Título Superior */}
      <div className="absolute top-50 text-center w-full">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          Atención al Cliente
        </h2>
      </div>

      {/* Tarjeta de Contenido */}
      <div
        className="
          w-full max-w-lg bg-white p-6 pt-0 text-center 
          shadow-2xl rounded-xl transition duration-500 border-b-8 border-green-500
          
        "
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {/* Sección del Círculo Superior (Ahora con IMG) */}
        <div className="relative -top-10 mb-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-blue-900 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
            {/* CAMBIO CLAVE: Usamos <img> en lugar de <Mail /> */}
            <img 
              src="https://i.ibb.co/67dNDvKf/STK-20240329-WA0236.webp"
              alt="Logo del Tío Egoz"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mensaje principal */}
        <p className="text-lg text-gray-700 font-medium mb-6">
          No me digas... ¿Un link caído? Estoy aquí para ayudar.
        </p>

        {/* Botón de Contacto */}
        <a
          href="https://t.me/EltioEgoz"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center 
            w-full sm:w-3/4 max-w-sm px-8 py-3 mb-8 
            text-lg font-bold text-white bg-green-500 rounded-lg 
            shadow-md transition duration-300 ease-in-out 
            hover:bg-green-600 hover:shadow-lg transform hover:scale-[1.02]
          "
        >
          Ir a Atención al Cliente
        </a>
        
        {/* Texto de reglas y notas */}
        <div className="text-left text-sm text-gray-600 space-y-4 pt-4 border-t border-gray-100">
          <p>
            En este apartado tendrás acceso a una vía directa con "El Tío Egoz", por ende.
            Agradezco, que respete el horario de atención, ¿qué tipo de consultas se 
            resuelven?, pueden ser dudas o ayudar con algún inconveniente ó error de alguna 
            url caída, solo pido que se respete eso, gracias. También no seas floja pidiendo 
            el link directo, si eso vas a pedir, ni te molestes en esperar respuesta.
          </p>
          
          {/* Horario de Atención */}
          <p className="flex items-center font-semibold text-gray-700">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            Estoy disponible de Todos los Días.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerServiceCard;

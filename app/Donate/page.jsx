// src/pages/Donate.jsx (Actualizado para abrir enlaces en la misma pestaña)
import React from 'react';
// Si estás usando un framework como Next.js, puedes importar imágenes locales así:
// import TioEgozIcon from '../public/images/tu-icono-tio-egoz.png'; // Ajusta la ruta a tu icono local

// Importa los iconos de PayPal y Binance.
// Para esto, puedes usar bibliotecas de iconos populares como 'react-icons' o simplemente enlaces a sus logotipos oficiales.
// Aquí usaremos enlaces directos a sus logotipos para mayor simplicidad.

// Componente para el Bloque de Donación (PayPal y Binance)
const DonationBlock = ({ title, iconSrc, description, buttonText, buttonLink }) => {
  // 💡 NOTA: El atributo 'target="_blank"' ha sido ELIMINADO del <a>
  // El atributo 'rel="noopener noreferrer"' se mantiene por seguridad en caso de que un enlace externo lo use.
  
  // Condición para PayPal (enlace externo): Si el enlace es externo, lo mantenemos seguro con target="_blank"
  const isExternal = buttonLink.startsWith('http');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 max-w-sm mx-auto">
      <div className="flex items-center mb-4">
        {/* Aquí iría el icono de PayPal o Binance. Puedes ajustar el tamaño */}
        <img src={iconSrc} alt={`${title} Icon`} className="w-10 h-10 mr-4 rounded-full" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      
      {/* Espacio para la descripción */}
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {description}
      </p>

      {/* Botón de Donación */}
      <a
        href={buttonLink}
        // 💡 CAMBIO CLAVE: Usa target="_blank" SOLO si el enlace es externo (como PayPal)
        // Para rutas internas como /Donate/binance, no se usará
        target={isExternal ? "_blank" : "_self"} 
        rel="noopener noreferrer" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition duration-300 ease-in-out"
      >
        {buttonText}
      </a>
    </div>
  );
};

// Componente principal de la página de Donaciones
const DonatePage = () => {


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12 text-center">
        Apoya al Tío Egoz 🗿🍷
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Bloque de Donación para PayPal */}
        <DonationBlock
                title="Tío Egoz - PayPal"
                iconSrc="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-mark-color.svg"
                description="Apoya nuestro contenido de forma segura y sencilla a través de PayPal. Cualquier contribución es bienvenida."
                // Este es un enlace EXTERNO (empieza con https), por lo que se abrirá en una nueva pestaña (según la lógica del componente DonationBlock).
                buttonLink="https://www.paypal.com/paypalme/ElTioEGoz?v=1&utm_source=unp&utm_medium=email&utm_campaign=RT000481&utm_unptid=078c1128-a23d-11f0-93aa-b93a2f169a17&ppid=RT000481&cnac=VE&rsta=es_XC%28es-VE%29&cust=L5GRQ8BRWCGUY&unptid=078c1128-a23d-11f0-93aa-b93a2f169a17&calc=f612303ddf518&unp_tpcid=ppme-social-business-profile-created&page=main%3Aemail%3ART000481&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.361.0&tenant_name=PAYPAL&xt=145585%2C154413%2C104038&link_ref=paypalme_eltioegoz" 
                buttonText="Donar con PayPal"
            />

        {/* Bloque de Donación para Binance */}
        <DonationBlock
                title="Tío Egoz - Binance"
                iconSrc="https://crystalpng.com/wp-content/uploads/2025/03/binance_logo.png"
                description="Realiza tus donaciones en criptomonedas (USDT, BTC, etc.) usando Binance Pay. ¡Es rápido, fácil y sin comisiones de red!"
                // Este es un enlace INTERNO (/Donate/binance), por lo que se abrirá en la MISMA pestaña (según la lógica del componente DonationBlock).
                buttonLink="/Donate/binance" 
                buttonText="Donar con Binance"
            />
      </div>

      {/* Puedes agregar más información o una nota de agradecimiento aquí */}
      <p className="text-gray-600 dark:text-gray-400 mt-12 text-center">
        ¡Gracias de antemano por tu generosidad y apoyo, no importa la cantidad si no la intencion!
      </p>
    </div>
  );
};

export default DonatePage;
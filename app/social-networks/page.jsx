import React from 'react';
// Corrección: El ícono 'TikTok' no existe en lucide-react. 
// Usaremos 'MessageSquarePlus' o 'SquareDashedKanban' como alternativa visual.
import { Send, Youtube, MonitorPlay, MessageSquarePlus } from 'lucide-react';
// Datos de los enlaces.
// 'color' usa las clases de Tailwind que definen el color de fondo.
// 'icon' utiliza los componentes de iconos de lucide-react.
const socialLinks = [
  {
    name: "Tik Tok",
    url: "https://www.tiktok.com/@tioegoz?_t=ZM-8yAUvP3wiJy&_r=1", // Reemplaza con la URL real de TikTok
    color: "bg-black hover:bg-gray-800",
    icon: MessageSquarePlus, // Usamos MessageSquarePlus como un icono genérico para redes
  },
  {
    name: "Canal de Telegram",
    url: "https://t.me/El_Kevinsito_2025_OG", // Reemplaza con la URL real de Telegram
    color: "bg-blue-500 hover:bg-blue-600",
    icon: Send,
  },
  {
    name: "Canal de YouTube",
    url: "https://www.youtube.com/@Kevinsito-h", // Reemplaza con la URL real de YouTube
    color: "bg-red-600 hover:bg-red-700",
    icon: Youtube,
  },
  {
    name: "Canal de Kick",
    url: "https://kick.com/el-tio-egoz", // Reemplaza con la URL real de Kick
    color: "bg-lime-500 hover:bg-lime-600",
    icon: MonitorPlay, // Usamos MonitorPlay como un sustituto visual para Kick
  },
  {
    name: "Servidor en Discord",
    url: "https://discord.gg/n2dSP7phY5", // Reemplaza con la URL real de Kick
    color: "bg-blue-500 hover:bg-blue-800",
    icon: MonitorPlay, // Usamos MonitorPlay como un sustituto visual para Kick
  },


];

/**
 * Componente funcional para un botón de enlace de red social.
 */
const SocialLinkButton = ({ name, url, color, Icon }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`
        flex items-center justify-start 
        w-full p-4 mb-4 text-white font-semibold 
        rounded-xl shadow-lg transition duration-300 ease-in-out 
        transform hover:scale-[1.02]
    ${color}
    `}
  >
    {/* Icono de la red social */}
    <Icon className="w-6 h-6 mr-4" />
    
    {/* Nombre del enlace */}
    <span className="text-lg tracking-wide">{name}</span>
  </a>
);

/**
 * Componente principal de la tarjeta de enlaces sociales.
 */
const SocialLinksCard = () => {


  return (

    <div className="min-h-screen bg-slate-900 flex items-start justify-center p-4 sm:p-8 font-sans">
      <div
        className="
          w-full max-w-sm bg-white p-6 shadow-2xl rounded-3xl 
          border-4 border-gray-100
          transition duration-500
          hover:shadow-3xl
        "
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {/* Cabecera del Perfil */}
        <div className="flex items-center mb-8">
          {/* Imagen de perfil del "Tío Egoz" */}
          <img
            src="images/logo.webp"
            alt="El Tío Egoz"
            className="w-20 h-20 rounded-full object-cover mr-4 p-1"
          />
          
          {/* Título */}
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            Enlaces del Tio Egoz
          </h1>
        </div>

        {/* Contenedor de Enlaces */}
        <div className="flex flex-col space-y-4">
          {socialLinks.map((link, index) => (
            <SocialLinkButton
              key={index}
              name={link.name}
              url={link.url}
              color={link.color}
              Icon={link.icon}
            />
          ))}
        </div>
        
        {/* Pie de página sutil */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Súmate a la Comunidad</p>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksCard;

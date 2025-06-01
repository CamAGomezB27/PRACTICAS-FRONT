import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  iconPosition?: 'left' | 'top';
}

const Card: React.FC<CardProps> = ({
  title,
  icon,
  className = '',
  iconPosition = 'left',
}) => {
  // Sombra base visible
  const baseShadow = 'shadow-[0_8px_15px_rgba(0,0,0,0.8)]'; // gris 

  // Hover: sombra azul fuerte + efecto de crecimiento
  const hoverEffects =
    'hover:shadow-[0_8px_15px_rgba(70,105,175,1.5)] hover:scale-[1.05]';

  // Layout según posición icono
  const layoutClasses =
    iconPosition === 'top'
      ? 'flex flex-col items-center justify-center p-4 space-y-2 text-blue-600'
      : 'flex items-center gap-4 p-5 text-blue-600';

  // Clase para el tamaño del ícono
  const iconSizeClass = 'text-3xl';

  return (
    <div
      className={`bg-white rounded-md cursor-pointer transition-all duration-300 ease-in-out transform ${baseShadow} ${hoverEffects} ${layoutClasses} ${className}`}
    >
      {icon && <div className={iconSizeClass}>{icon}</div>}
      <span className="text-md font-semibold">{title}</span>
    </div>
  );
};

export default Card;

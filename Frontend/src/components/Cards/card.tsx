import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  iconPosition?: 'left' | 'top';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  icon,
  className = '',
  iconPosition = 'left',
  onClick,
}) => {
  // Sombra base visible
  const baseShadow = 'shadow-[2px_8px_12px_rgba(0,0,0,0.8)]'; // gris

  // Hover: sombra azul fuerte + efecto de crecimiento
  const hoverEffects =
    'hover:shadow-[4px_8px_15px_rgba(100,125,200,8)] hover:scale-[1.05]';

  // Layout según posición icono
  const layoutClasses =
    iconPosition === 'top'
      ? 'flex flex-col items-center justify-center p-4 space-y-2 text-blue-600'
      : 'flex items-center gap-4 p-5 text-blue-600';

  const iconColorClass = 'text-[#4669AF]';
  const textColorClass = 'text-[#4669AF]';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-md cursor-pointer transition-all duration-300 ease-in-out transform ${baseShadow} ${hoverEffects} ${layoutClasses} ${className}`}
    >
      {icon && <div className={`text-3xl ${iconColorClass}`}>{icon}</div>}
      <span className={`text-md font-bold text-center ${textColorClass}`}>
        {title}
      </span>
    </div>
  );
};

export default Card;

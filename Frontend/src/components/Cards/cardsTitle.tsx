import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  iconPosition?: 'left' | 'top';
  color?: string; // color de la franja
  headerLabel?: string;
  onClick?: () => void;
}

const CardsTitle: React.FC<CardProps> = ({
  title,
  icon,
  className = '',
  iconPosition = 'left',
  color = 'bg-gray-400',
  headerLabel,
  onClick,
}) => {
  const baseShadow = 'shadow-[2px_8px_12px_rgba(0,0,0,0.8)]';
  const hoverEffects =
    'hover:shadow-[4px_8px_15px_rgba(100,125,200,8)] hover:scale-[1.05]';

  const layoutClasses =
    iconPosition === 'top'
      ? 'flex flex-col items-center justify-center p-4 space-y-2'
      : 'flex items-center gap-4 p-5';

  const iconColorClass = 'text-[#4669AF]';
  const textColorClass = 'text-[#4669AF]';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-md cursor-pointer transition-all duration-300 ease-in-out transform ${baseShadow} ${hoverEffects} ${className}`}
    >
      {/* Franja superior */}
      {headerLabel && (
        <div
          className={`w-full text-white text-xs font-semibold py-1 px-2 rounded-t-md ${color}`}
        >
          {headerLabel}
        </div>
      )}

      {/* Contenido principal */}
      <div className={layoutClasses}>
        {icon && <div className={`text-3xl ${iconColorClass}`}>{icon}</div>}
        <span className={`text-md font-bold text-center ${textColorClass}`}>
          {title}
        </span>
      </div>
    </div>
  );
};

export default CardsTitle;

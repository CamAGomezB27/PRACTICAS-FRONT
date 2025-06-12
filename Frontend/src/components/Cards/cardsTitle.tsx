import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  iconPosition?: 'left' | 'top';
  color?: string;
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
    'hover:shadow-[4px_8px_15px_rgba(10,10,200,1.5)] hover:scale-[1.05]';

  const layoutClasses =
    iconPosition === 'top'
      ? 'flex flex-col items-center justify-center p-4 space-y-2 text-blue-600'
      : 'flex items-center gap-4 p-5 text-blue-600';

  const iconSizeClass = 'text-3xl';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-md cursor-pointer transition-all duration-300 ease-in-out transform ${baseShadow} ${hoverEffects} ${className}`}
    >
      {/* Franja opcional arriba */}
      {headerLabel && (
        <div
          className={`w-full text-white text-xs font-semibold py-1 px-2 rounded-t-md ${color}`}
        >
          {headerLabel}
        </div>
      )}

      <div className={layoutClasses}>
        {icon && <div className={iconSizeClass}>{icon}</div>}
        <span className="text-md font-bold text-center">{title}</span>
      </div>
    </div>
  );
};

export default CardsTitle;

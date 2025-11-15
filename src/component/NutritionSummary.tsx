import { NutritionSummary } from '../types';

interface NutritionSummaryProps {
  nutrition: NutritionSummary;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

const NutritionSummary = ({ nutrition, title = "AI Nutrition Summary", size = 'md' }: NutritionSummaryProps) => {
  const sizeClasses = {
    sm: 'text-sm p-3',
    md: 'text-base p-4',
    lg: 'text-lg p-6',
  };

  const valueClasses = {
    sm: 'text-lg font-bold',
    md: 'text-xl font-bold',
    lg: 'text-2xl font-bold',
  };

  return (
    <div className={`bg-latte-sand rounded-lg ${sizeClasses[size]}`}>
      <h3 className="heading-cooper text-sm mb-3 text-dark-cocoa opacity-80">{title}</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className={`${valueClasses[size]} text-dark-cocoa`}>
            {nutrition.calories}
          </div>
          <div className="text-xs text-gray-600 mt-1">Calories</div>
        </div>
        <div className="text-center">
          <div className={`${valueClasses[size]} text-dark-cocoa`}>
            {nutrition.protein}g
          </div>
          <div className="text-xs text-gray-600 mt-1">Protein</div>
        </div>
        <div className="text-center">
          <div className={`${valueClasses[size]} text-dark-cocoa`}>
            {nutrition.sugar}g
          </div>
          <div className="text-xs text-gray-600 mt-1">Sugar</div>
        </div>
      </div>
    </div>
  );
};

export default NutritionSummary;
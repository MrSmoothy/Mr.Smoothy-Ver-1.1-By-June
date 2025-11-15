import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const LifestyleSelection = () => {
  const navigate = useNavigate();
  const { setLifestyles } = useStore();
  
  const lifestyles = [
    { id: 'healthy-living', name: 'Healthy Living', icon: '🥗', description: 'Balanced nutrition for everyday wellness' },
    { id: 'workout', name: 'Workout', icon: '💪', description: 'High protein and energy for fitness enthusiasts' },
    { id: 'low-sugar', name: 'Low Sugar', icon: '🍃', description: 'Minimal sugar options for health-conscious choices' },
    { id: 'high-energy', name: 'High Energy', icon: '⚡', description: 'Boost your day with energizing blends' },
    { id: 'detox', name: 'Detox', icon: '🌿', description: 'Cleansing ingredients to refresh your body' },
  ];

  const [selectedLifestyles, setSelectedLifestyles] = useState<string[]>([]);

  const toggleLifestyle = (lifestyleId: string) => {
    setSelectedLifestyles(prev => 
      prev.includes(lifestyleId)
        ? prev.filter(id => id !== lifestyleId)
        : [...prev, lifestyleId]
    );
  };

  const handleSaveAndContinue = () => {
    setLifestyles(selectedLifestyles);
    navigate('/ready-menu');
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-cooper text-4xl md:text-5xl mb-4">
            Choose Your Lifestyle
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select the lifestyle options that best describe your preferences. 
            We'll use these to recommend the perfect smoothies for you.
          </p>
        </div>

        {/* Lifestyle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {lifestyles.map((lifestyle) => {
            const isSelected = selectedLifestyles.includes(lifestyle.id);
            
            return (
              <div
                key={lifestyle.id}
                onClick={() => toggleLifestyle(lifestyle.id)}
                className={`card p-6 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'ring-2 ring-dark-cocoa bg-latte-sand' 
                    : 'hover:shadow-lg hover:scale-105'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{lifestyle.icon}</div>
                  <h3 className="heading-cooper text-xl mb-2">{lifestyle.name}</h3>
                  <p className="text-gray-600 text-sm">{lifestyle.description}</p>
                  
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="mt-4">
                      <div className="inline-flex items-center justify-center w-6 h-6 bg-dark-cocoa rounded-full">
                        <svg className="w-4 h-4 text-soft-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary px-8 py-3 text-lg"
          >
            Back
          </button>
          
          <button
            onClick={handleSaveAndContinue}
            disabled={selectedLifestyles.length === 0}
            className={`btn-primary px-8 py-3 text-lg ${
              selectedLifestyles.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Save & Continue
          </button>
        </div>

        {/* Selected Count */}
        {selectedLifestyles.length > 0 && (
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {selectedLifestyles.length} lifestyle{selectedLifestyles.length > 1 ? 's' : ''} selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifestyleSelection;
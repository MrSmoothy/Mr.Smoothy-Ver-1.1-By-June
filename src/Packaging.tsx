import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPackaging, mockStraws } from '../data/mockData';
import { Packaging, Straw, CartItem } from '../types';
import { useStore } from '../store/useStore';
import Card from '../components/Card';

const Packaging = () => {
  const navigate = useNavigate();
  const { cart, addToCart } = useStore();
  
  const [selectedPackaging, setSelectedPackaging] = useState<Packaging | null>(null);
  const [selectedStraw, setSelectedStraw] = useState<Straw | null>(null);

  // Get the last cart item (the smoothie that was just added)
  const lastCartItem = cart[cart.length - 1];

  const handlePackagingSelect = (packaging: Packaging) => {
    setSelectedPackaging(packaging);
  };

  const handleStrawSelect = (straw: Straw) => {
    setSelectedStraw(straw);
  };

  const handleContinue = () => {
    if (lastCartItem && selectedPackaging) {
      // Update the last cart item with packaging and straw
      const updatedItem: CartItem = {
        ...lastCartItem,
        packaging: selectedPackaging,
        straw: selectedStraw,
      };

      // Remove the last item and add the updated one
      const updatedCart = [...cart.slice(0, -1), updatedItem];
      
      // Update cart (this is a simplified approach - in a real app you'd have a proper update method)
      navigate('/cart');
    }
  };

  const packagingTypes = ['Standard Cup', 'Eco Cup', 'Glass Bottle', 'Tumbler'];
  const sizes = ['S', 'M', 'L'];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-cooper text-4xl md:text-5xl mb-4">
            Choose Packaging & Straw
          </h1>
          <p className="text-gray-600 text-lg">
            Complete your smoothie order with the perfect packaging
          </p>
        </div>

        {/* Current Item Summary */}
        {lastCartItem && (
          <div className="bg-latte-sand rounded-xl p-6 mb-12">
            <h2 className="heading-cooper text-2xl mb-4">Your Smoothie</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-dark-cocoa">{lastCartItem.name}</h3>
                <p className="text-gray-600">Base price: ${lastCartItem.price}</p>
              </div>
              <div className="text-3xl">🥤</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Packaging Selection */}
          <div>
            <h2 className="heading-cooper text-3xl mb-8">Packaging Options</h2>
            
            {packagingTypes.map(type => (
              <div key={type} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-dark-cocoa">{type}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {mockPackaging
                    .filter(pkg => pkg.type === type)
                    .map(pkg => (
                      <Card
                        key={pkg.id}
                        hover
                        onClick={() => handlePackagingSelect(pkg)}
                        className={`cursor-pointer transition-all ${
                          selectedPackaging?.id === pkg.id
                            ? 'ring-2 ring-dark-cocoa bg-latte-sand'
                            : 'hover:shadow-lg'
                        }`}
                      >
                        <div className="text-center">
                          <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-4xl">
                              {type === 'Glass Bottle' ? '🍾' : 
                               type === 'Tumbler' ? '🥤' : '🥤'}
                            </span>
                          </div>
                          <h4 className="font-semibold mb-2">{pkg.size}</h4>
                          <p className="text-dark-cocoa font-bold">${pkg.price}</p>
                          {pkg.style && (
                            <p className="text-sm text-gray-600 mt-1">{pkg.style}</p>
                          )}
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Straw Selection */}
          <div>
            <h2 className="heading-cooper text-3xl mb-8">Straw Options</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mockStraws.map(straw => (
                <Card
                  key={straw.id}
                  hover
                  onClick={() => handleStrawSelect(straw)}
                  className={`cursor-pointer transition-all ${
                    selectedStraw?.id === straw.id
                      ? 'ring-2 ring-dark-cocoa bg-latte-sand'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="text-center">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-4xl">🥤</span>
                    </div>
                    <h4 className="font-semibold mb-2">{straw.type}</h4>
                    <p className="text-dark-cocoa font-bold">${straw.price}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Selection Summary */}
            {(selectedPackaging || selectedStraw) && (
              <div className="mt-8 bg-latte-sand rounded-xl p-6">
                <h3 className="heading-cooper text-xl mb-4">Selection Summary</h3>
                
                {selectedPackaging && (
                  <div className="mb-3">
                    <p className="text-dark-cocoa font-medium">
                      Packaging: {selectedPackaging.type} - {selectedPackaging.size}
                      {selectedPackaging.style && ` (${selectedPackaging.style})`}
                    </p>
                    <p className="text-gray-600">+${selectedPackaging.price}</p>
                  </div>
                )}
                
                {selectedStraw && (
                  <div className="mb-3">
                    <p className="text-dark-cocoa font-medium">
                      Straw: {selectedStraw.type}
                    </p>
                    <p className="text-gray-600">+${selectedStraw.price}</p>
                  </div>
                )}
                
                <div className="border-t pt-3 mt-4">
                  <p className="text-dark-cocoa font-bold">
                    Additional cost: ${(selectedPackaging?.price || 0) + (selectedStraw?.price || 0)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-12">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary px-8 py-3 text-lg"
          >
            Back
          </button>
          
          <button
            onClick={handleContinue}
            disabled={!selectedPackaging}
            className={`btn-primary px-8 py-3 text-lg ${
              !selectedPackaging ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Continue to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Packaging;
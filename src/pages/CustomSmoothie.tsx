import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockIngredients } from '../data/mockData';
import { Ingredient, SelectedIngredient } from '../types';
import { useStore } from '../store/useStore';
import Card from '../components/Card';
import NutritionSummary from '../components/NutritionSummary';
import Modal from '../components/Modal';

const CustomSmoothie = () => {
  const navigate = useNavigate();
  const { 
    selectedIngredients, 
    nutritionSummary,
    addIngredient, 
    removeIngredient, 
    updateIngredientQuantity,
    calculateNutrition 
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showNutritionModal, setShowNutritionModal] = useState(false);

  const categories = ['All', 'Organic Fruits', 'Organic Vegetables', 'Superfoods', 'Protein', 'Base', 'Topping', 'Sweetener'];

  // Filter ingredients based on search and category
  const filteredIngredients = useMemo(() => {
    return mockIngredients.filter(ingredient => {
      const matchesSearch = searchTerm === '' || 
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || ingredient.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Group ingredients by category
  const ingredientsByCategory = useMemo(() => {
    const grouped: Record<string, Ingredient[]> = {};
    
    categories.slice(1).forEach(category => {
      grouped[category] = mockIngredients.filter(ing => ing.category === category);
    });
    
    return grouped;
  }, []);

  const handleIngredientClick = (ingredient: Ingredient) => {
    addIngredient({ ingredient, quantity: 1 });
  };

  const handleQuantityChange = (ingredientId: string, quantity: number) => {
    if (quantity <= 0) {
      removeIngredient(ingredientId);
    } else {
      updateIngredientQuantity(ingredientId, quantity);
    }
  };

  const handleCalculateNutrition = () => {
    calculateNutrition();
    setShowNutritionModal(true);
  };

  const handleAddToCart = () => {
    if (selectedIngredients.length > 0 && nutritionSummary) {
      // Create a custom smoothie name based on main ingredients
      const mainIngredients = selectedIngredients.slice(0, 3).map(si => si.ingredient.name);
      const customName = `Custom ${mainIngredients.join(' & ')} Smoothie`;
      
      // Calculate base price
      const basePrice = selectedIngredients.reduce((sum, si) => {
        return sum + (si.ingredient.kcal * si.quantity * 0.01); // Simple pricing based on calories
      }, 8.99);

      // Add to cart logic would go here
      navigate('/packaging');
    }
  };

  const totalCalories = selectedIngredients.reduce((sum, si) => sum + (si.ingredient.kcal * si.quantity), 0);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-cooper text-4xl md:text-5xl mb-4">
            Build Your Custom Smoothie
          </h1>
          <p className="text-gray-600 text-lg">
            Choose from our premium ingredients to create your perfect blend
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Selection Area */}
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-cocoa focus:border-transparent"
                />
                <svg 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-dark-cocoa text-soft-cream'
                      : 'bg-latte-sand text-dark-cocoa hover:bg-opacity-80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Ingredients Grid */}
            {selectedCategory === 'All' ? (
              <div className="space-y-8">
                {Object.entries(ingredientsByCategory).map(([category, ingredients]) => (
                  <div key={category}>
                    <h3 className="heading-cooper text-2xl mb-4">{category}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ingredients.map(ingredient => (
                        <Card 
                          key={ingredient.id} 
                          hover 
                          onClick={() => handleIngredientClick(ingredient)}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-3xl">{ingredient.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-dark-cocoa">{ingredient.name}</h4>
                              <p className="text-sm text-gray-600">{ingredient.kcal} kcal</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIngredients.map(ingredient => (
                  <Card 
                    key={ingredient.id} 
                    hover 
                    onClick={() => handleIngredientClick(ingredient)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{ingredient.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-dark-cocoa">{ingredient.name}</h4>
                        <p className="text-sm text-gray-600">{ingredient.kcal} kcal</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredIngredients.length === 0 && selectedCategory !== 'All' && (
              <div className="text-center py-12">
                <p className="text-gray-600">No ingredients found matching your search.</p>
              </div>
            )}
          </div>

          {/* Selected Ingredients Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <h2 className="heading-cooper text-2xl mb-6">Selected Ingredients</h2>
                
                {selectedIngredients.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No ingredients selected yet. Start adding ingredients to build your smoothie!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {/* Ingredient List */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {selectedIngredients.map(({ ingredient, quantity }) => (
                        <div key={ingredient.id} className="flex items-center justify-between bg-latte-sand bg-opacity-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{ingredient.icon}</span>
                            <div>
                              <h4 className="font-medium text-dark-cocoa">{ingredient.name}</h4>
                              <p className="text-xs text-gray-600">{ingredient.kcal * quantity} kcal</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(ingredient.id, quantity - 1)}
                              className="w-6 h-6 bg-dark-cocoa text-soft-cream rounded-full flex items-center justify-center hover:opacity-80"
                            >
                              -
                            </button>
                            <span className="font-medium w-8 text-center">{quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(ingredient.id, quantity + 1)}
                              className="w-6 h-6 bg-dark-cocoa text-soft-cream rounded-full flex items-center justify-center hover:opacity-80"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total Calories */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-dark-cocoa">Total Calories:</span>
                        <span className="text-xl font-bold text-dark-cocoa">{totalCalories}</span>
                      </div>
                    </div>

                    {/* Calculate Nutrition Button */}
                    <button
                      onClick={handleCalculateNutrition}
                      className="w-full btn-secondary mb-4"
                    >
                      Calculate Nutrition (AI)
                    </button>

                    {/* Calculate Nutrition Button */}
                    <button
                      onClick={handleCalculateNutrition}
                      className="w-full btn-secondary mb-4"
                    >
                      🧠 Calculate Nutrition (AI)
                    </button>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      disabled={selectedIngredients.length === 0 || !nutritionSummary}
                      className={`w-full btn-primary ${
                        selectedIngredients.length === 0 || !nutritionSummary ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Nutrition Summary Modal */}
      <Modal 
        isOpen={showNutritionModal} 
        onClose={() => setShowNutritionModal(false)}
        title="AI Nutrition Summary"
      >
        {nutritionSummary && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-latte-sand to-soft-cream rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🧠</span>
              </div>
              <h3 className="heading-cooper text-2xl mb-4">Your Custom Smoothie</h3>
              <p className="text-gray-600 mb-4">
                Based on your selected ingredients
              </p>
            </div>
            
            <NutritionSummary nutrition={nutritionSummary} size="lg" />
            
            <div className="space-y-3">
              <h4 className="font-semibold text-dark-cocoa">Selected Ingredients:</h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedIngredients.map(({ ingredient, quantity }) => (
                  <div key={ingredient.id} className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-lg border border-latte-sand/20">
                    <span className="text-3xl">{ingredient.icon}</span>
                    <div className="flex-1">
                      <span className="font-medium text-dark-cocoa">{ingredient.name}</span>
                      <span className="text-sm text-gray-600">x{quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-4 pt-6">
              <button
                onClick={() => setShowNutritionModal(false)}
                className="flex-1 btn-secondary bg-white/10 hover:bg-white/20"
              >
                ✏️ Continue Editing
              </button>
              <button
                onClick={() => {
                  setShowNutritionModal(false);
                  // Navigate to packaging directly since nutrition is already calculated
                  if (selectedIngredients.length > 0 && nutritionSummary) {
                    const mainIngredients = selectedIngredients.slice(0, 3).map(si => si.ingredient.name);
                    const customName = `Custom ${mainIngredients.join(' & ')} Smoothie`;
                    navigate('/packaging');
                  }
                }}
                className="flex-1 btn-primary"
              >
                🛒 Add to Cart & Go to Packaging
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CustomSmoothie;
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMenus, mockIngredients } from '../data/mockData';
import { Menu, NutritionSummary } from '../types';
import { useStore } from '../store/useStore';
import Card from '../components/Card';
import Modal from '../components/Modal';
import NutritionSummary from '../components/NutritionSummary';

const ReadyMenu = () => {
  const navigate = useNavigate();
  const { lifestyles, addToCart, setSelectedMenu, selectedMenu } = useStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nutritionSummary, setNutritionSummary] = useState<NutritionSummary | null>(null);

  const categories = ['All', 'Signature', 'Classic', 'Green Booster', 'High-Protein Smoothies', 'Superfruits'];

  // Calculate nutrition for a menu based on its ingredients
  const calculateMenuNutrition = (menu: Menu): NutritionSummary => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalSugar = 0;

    menu.ingredients.forEach(ingredientName => {
      const ingredient = mockIngredients.find(ing => 
        ing.name.toLowerCase() === ingredientName.toLowerCase()
      );
      if (ingredient) {
        totalCalories += ingredient.kcal;
        totalProtein += ingredient.protein_g;
        totalSugar += ingredient.sugar_g;
      }
    });

    // Add some base calories for liquid and preparation
    totalCalories += 50;
    totalSugar += 5;

    return {
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein * 10) / 10,
      sugar: Math.round(totalSugar * 10) / 10
    };
  };

  // Filter menus based on search and category
  const filteredMenus = useMemo(() => {
    return mockMenus.filter(menu => {
      const matchesSearch = searchTerm === '' || 
        menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        menu.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        menu.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || menu.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Group menus by category
  const menusByCategory = useMemo(() => {
    const grouped: Record<string, Menu[]> = {};
    
    categories.slice(1).forEach(category => {
      grouped[category] = filteredMenus.filter(menu => menu.category === category);
    });
    
    return grouped;
  }, [filteredMenus]);

  const handleMenuClick = (menu: Menu) => {
    const nutrition = calculateMenuNutrition(menu);
    setNutritionSummary(nutrition);
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  const handleAddToCart = () => {
    if (selectedMenu && nutritionSummary) {
      addToCart({
        id: `ready-${selectedMenu.id}`,
        type: 'ready',
        name: selectedMenu.name,
        price: selectedMenu.price,
        nutrition: nutritionSummary,
        quantity: 1,
      });
      
      setIsModalOpen(false);
      navigate('/packaging');
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-cooper text-4xl md:text-5xl mb-4">
            Ready Smoothie Menu
          </h1>
          <p className="text-gray-600 text-lg">
            Choose from our carefully crafted smoothie selections
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search smoothies... (try '0% sugar', 'low sugar', 'high protein')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-dark-cocoa focus:border-transparent text-lg"
            />
            <svg 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-dark-cocoa text-soft-cream'
                  : 'bg-latte-sand text-dark-cocoa hover:bg-opacity-80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid by Category */}
        {selectedCategory === 'All' ? (
          <div className="space-y-16">
            {Object.entries(menusByCategory).map(([category, menus]) => (
              <div key={category}>
                <h2 className="heading-cooper text-3xl mb-8 text-center">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {menus.map(menu => (
                    <Card 
                      key={menu.id} 
                      hover 
                      onClick={() => handleMenuClick(menu)}
                      className="cursor-pointer"
                    >
                      <div className="aspect-square bg-latte-sand rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-5xl">🥤</span>
                      </div>
                      <h3 className="heading-cooper text-lg mb-2">{menu.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{menu.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-dark-cocoa">${menu.price}</span>
                        <div className="flex flex-wrap gap-1">
                          {menu.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs bg-latte-sand px-2 py-1 rounded-full text-dark-cocoa">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMenus.map(menu => (
              <Card 
                key={menu.id} 
                hover 
                onClick={() => handleMenuClick(menu)}
                className="cursor-pointer"
              >
                <div className="aspect-square bg-latte-sand rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-5xl">🥤</span>
                </div>
                <h3 className="heading-cooper text-lg mb-2">{menu.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{menu.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-dark-cocoa">${menu.price}</span>
                  <div className="flex flex-wrap gap-1">
                    {menu.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-latte-sand px-2 py-1 rounded-full text-dark-cocoa">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredMenus.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No smoothies found matching your search.</p>
          </div>
        )}

        {/* Menu Detail Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          size="lg"
          title={selectedMenu?.name}
        >
          {selectedMenu && nutritionSummary && (
            <div className="space-y-6">
              {/* Image */}
              <div className="aspect-video bg-latte-sand rounded-lg flex items-center justify-center">
                <span className="text-8xl">🥤</span>
              </div>

              {/* Description and Price */}
              <div>
                <p className="text-gray-600 mb-4">{selectedMenu.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-dark-cocoa">${selectedMenu.price}</span>
                  <span className="bg-latte-sand px-4 py-2 rounded-full text-dark-cocoa font-medium">
                    {selectedMenu.category}
                  </span>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="heading-cooper text-xl mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMenu.ingredients.map((ingredient, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Nutrition Summary */}
              <NutritionSummary nutrition={nutritionSummary} />

              {/* Tags */}
              <div>
                <h3 className="heading-cooper text-xl mb-3">Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMenu.tags.map(tag => (
                    <span key={tag} className="bg-latte-sand px-3 py-1 rounded-full text-dark-cocoa">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary text-lg py-4"
              >
                Add to Cart
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ReadyMenu;
import { Link } from 'react-router-dom';
import { mockMenus } from '../data/mockData';
import Card from '../components/Card';

const Home = () => {
  // Get popular menus (first 6 for demo)
  const popularMenus = mockMenus.slice(0, 6);
  
  // Get featured ingredients (demo data)
  const featuredIngredients = [
    { name: 'Organic Spinach', icon: '🥬', benefit: 'Rich in iron and vitamins' },
    { name: 'Fresh Berries', icon: '🫐', benefit: 'Antioxidant powerhouse' },
    { name: 'Almond Milk', icon: '🥛', benefit: 'Dairy-free calcium source' },
    { name: 'Chia Seeds', icon: '🌰', benefit: 'Omega-3 fatty acids' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-latte-sand to-soft-cream py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="heading-cooper text-5xl md:text-6xl mb-6 text-dark-cocoa">
            Welcome to Mr.Smoothy
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Your premium destination for healthy, delicious smoothies. 
            Choose from our signature menu or create your perfect blend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ready-menu" className="btn-primary text-lg px-8 py-4">
              Explore Ready Menu
            </Link>
            <Link to="/custom-smoothie" className="btn-secondary text-lg px-8 py-4">
              Build Your Own
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-dark-cocoa py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-latte-sand rounded-xl p-8">
            <h2 className="heading-cooper text-3xl mb-4 text-dark-cocoa">
              🎉 Special Offer This Week
            </h2>
            <p className="text-lg text-dark-cocoa mb-4">
              Get 20% off all High-Protein Smoothies!
            </p>
            <p className="text-dark-cocoa opacity-80">
              Use code: <span className="font-bold">PROTEIN20</span>
            </p>
          </div>
        </div>
      </section>

      {/* Popular Menus */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-cooper text-4xl mb-4">Popular Smoothies</h2>
            <p className="text-gray-600 text-lg">Customer favorites you'll love</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularMenus.map((menu) => (
              <Link key={menu.id} to={`/ready-menu`}>
                <Card hover className="h-full">
                  <div className="aspect-square bg-latte-sand rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl">🥤</span>
                  </div>
                  <h3 className="heading-cooper text-xl mb-2">{menu.name}</h3>
                  <p className="text-gray-600 mb-4">{menu.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-dark-cocoa">${menu.price}</span>
                    <span className="text-sm bg-latte-sand px-3 py-1 rounded-full text-dark-cocoa">
                      {menu.category}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/ready-menu" className="btn-primary text-lg px-8 py-3">
              View All Smoothies
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Ingredients */}
      <section className="py-16 px-4 bg-latte-sand bg-opacity-30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-cooper text-4xl mb-4">Premium Ingredients</h2>
            <p className="text-gray-600 text-lg">Only the finest for your health</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredIngredients.map((ingredient, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-3xl">{ingredient.icon}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{ingredient.name}</h3>
                <p className="text-gray-600 text-sm">{ingredient.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-dark-cocoa">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-cooper text-4xl mb-6 text-soft-cream">
            Ready to Start Your Healthy Journey?
          </h2>
          <p className="text-xl text-soft-cream mb-8 opacity-90">
            Join thousands of satisfied customers who have transformed their health with Mr.Smoothy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-soft-cream text-dark-cocoa px-8 py-4 rounded-lg font-medium hover:bg-opacity-90 transition-opacity text-lg">
              Get Started Now
            </Link>
            <Link to="/ready-menu" className="border-2 border-soft-cream text-soft-cream px-8 py-4 rounded-lg font-medium hover:bg-soft-cream hover:text-dark-cocoa transition-all text-lg">
              Browse Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-dark-cocoa to-dark-cocoa/90 text-soft-cream py-16 px-4 border-t border-latte-sand/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <h3 className="heading-cooper text-2xl text-soft-cream">Mr.Smoothy</h3>
              <p className="text-soft-cream/80">Your premium smoothie destination for healthy living.</p>
              <div className="flex space-x-4 mt-4">
                <div className="w-8 h-8 bg-latte-sand rounded-full flex items-center justify-center">
                  <span className="text-xs">📧</span>
                </div>
                <div className="w-8 h-8 bg-latte-sand rounded-full flex items-center justify-center">
                  <span className="text-xs">📱</span>
                </div>
                <div className="w-8 h-8 bg-latte-sand rounded-full flex items-center justify-center">
                  <span className="text-xs">📍</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4 text-soft-cream">Quick Links</h4>
              <ul className="space-y-3 text-soft-cream/80">
                <li><Link to="/ready-menu" className="hover:text-latte-sand transition-colors">Ready Menu</Link></li>
                <li><Link to="/custom-smoothie" className="hover:text-latte-sand transition-colors">Custom Smoothie</Link></li>
                <li><Link to="/about" className="hover:text-latte-sand transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-latte-sand transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4 text-soft-cream">Categories</h4>
              <ul className="space-y-3 text-soft-cream/80">
                <li className="hover:text-latte-sand transition-colors cursor-pointer">Signature Collection</li>
                <li className="hover:text-latte-sand transition-colors cursor-pointer">Classic Favorites</li>
                <li className="hover:text-latte-sand transition-colors cursor-pointer">Green Booster</li>
                <li className="hover:text-latte-sand transition-colors cursor-pointer">High-Protein</li>
                <li className="hover:text-latte-sand transition-colors cursor-pointer">Superfruits</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4 text-soft-cream">Get in Touch</h4>
              <ul className="space-y-3 text-soft-cream/80">
                <li>📧 info@mrsmoothy.com</li>
                <li>📞 1-800-SMOOTHIE</li>
                <li>🕐 Mon-Fri: 8AM-8PM</li>
                <li>📍 123 Health Street, Wellness City</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-latte-sand/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-soft-cream/60 text-sm">
                &copy; 2024 Mr.Smoothy. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <span className="text-soft-cream/60 hover:text-latte-sand cursor-pointer transition-colors">Privacy Policy</span>
                <span className="text-soft-cream/60 hover:text-latte-sand cursor-pointer transition-colors">Terms of Service</span>
                <span className="text-soft-cream/60 hover:text-latte-sand cursor-pointer transition-colors">Cookie Policy</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
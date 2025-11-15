import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';

const NavBar = () => {
  const location = useLocation();
  const { isAuthenticated, cart } = useStore();
  
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const navItems = [
    { path: '/', label: 'Home', showAlways: true },
    { path: '/ready-menu', label: 'Ready Menu', showAlways: true },
    { path: '/custom-smoothie', label: 'Custom Menu', showAlways: true },
    { path: '/packaging', label: 'Packaging', showAlways: true },
    { path: '/cart', label: `Cart${cartItemCount > 0 ? ` (${cartItemCount})` : ''}`, showAlways: true },
    { path: '/login', label: 'Login', showWhen: !isAuthenticated },
    { path: '/register', label: 'Register', showWhen: !isAuthenticated },
    { path: '/logout', label: 'Logout', showWhen: isAuthenticated },
    { path: '/admin/login', label: 'Admin', showWhen: !isAuthenticated },
  ];

  const visibleNavItems = navItems.filter(item => {
    if (item.showAlways) return true;
    if (item.showWhen !== undefined) return item.showWhen;
    return true;
  });

  return (
    <nav className="bg-gradient-to-r from-dark-cocoa to-dark-cocoa/95 shadow-lg sticky top-0 z-50 border-b border-latte-sand/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-latte-sand to-soft-cream rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
              <span className="text-dark-cocoa font-bold text-base">MS</span>
            </div>
            <div>
              <span className="heading-cooper text-2xl sm:text-3xl text-soft-cream block group-hover:text-latte-sand transition-colors">Mr.Smoothy</span>
              <span className="text-xs text-soft-cream/80 block">Healthy Living Since 2024</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {visibleNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg ${
                  location.pathname === item.path
                    ? 'bg-latte-sand text-dark-cocoa shadow-sm'
                    : 'text-soft-cream/90 hover:text-soft-cream hover:bg-white/10 rounded-lg'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-soft-cream p-2 hover:bg-white/10 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden pb-4 bg-dark-cocoa/95 rounded-lg mt-2">
          {visibleNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block py-3 text-sm font-medium transition-colors border-b border-latte-sand/20 last:border-b-0 ${
                location.pathname === item.path
                  ? 'text-latte-sand bg-latte-sand/20 px-4'
                  : 'text-soft-cream/80 hover:text-soft-cream hover:bg-white/10 px-4'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
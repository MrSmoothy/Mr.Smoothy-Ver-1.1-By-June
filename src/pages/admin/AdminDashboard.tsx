import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockMenus, mockIngredients, mockPackaging, mockStraws } from '../../data/mockData';
import { Menu, Ingredient, Packaging, Straw } from '../../types';
import Card from '../../components/Card';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'menus' | 'ingredients' | 'packaging' | 'orders' | 'reports'>('menus');
  const [editingItem, setEditingItem] = useState<Menu | Ingredient | Packaging | Straw | null>(null);

  // Mock orders data
  const mockOrders = [
    { id: '1', customer: 'john@example.com', items: 2, total: 28.99, date: '2024-01-15', status: 'completed' },
    { id: '2', customer: 'sarah@example.com', items: 1, total: 14.50, date: '2024-01-15', status: 'pending' },
    { id: '3', customer: 'mike@example.com', items: 3, total: 42.75, date: '2024-01-14', status: 'completed' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const tabs = [
    { id: 'menus', label: 'Ready Menus', count: mockMenus.length },
    { id: 'ingredients', label: 'Ingredients', count: mockIngredients.length },
    { id: 'packaging', label: 'Packaging', count: mockPackaging.length + mockStraws.length },
    { id: 'orders', label: 'Orders', count: mockOrders.length },
    { id: 'reports', label: 'Reports', count: null },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'menus':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="heading-cooper text-2xl">Manage Ready Menus</h2>
              <button className="btn-primary">Add New Menu</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockMenus.map((menu) => (
                <Card key={menu.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-latte-sand rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-4xl">🥤</span>
                  </div>
                  <h3 className="heading-cooper text-lg mb-2">{menu.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{menu.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-dark-cocoa">${menu.price}</span>
                    <span className="bg-latte-sand px-2 py-1 rounded-full text-sm">{menu.category}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 btn-secondary text-sm py-2">Edit</button>
                    <button className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600">Delete</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'ingredients':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="heading-cooper text-2xl">Manage Ingredients</h2>
              <button className="btn-primary">Add New Ingredient</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockIngredients.map((ingredient) => (
                <Card key={ingredient.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{ingredient.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-dark-cocoa">{ingredient.name}</h4>
                      <p className="text-xs text-gray-600">{ingredient.category}</p>
                      <p className="text-sm text-dark-cocoa">{ingredient.kcal} kcal</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 btn-secondary text-xs py-1">Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">Delete</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'packaging':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="heading-cooper text-2xl">Manage Packaging & Straws</h2>
              <button className="btn-primary">Add New Item</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Packaging */}
              <div>
                <h3 className="heading-cooper text-xl mb-4">Packaging</h3>
                <div className="space-y-3">
                  {mockPackaging.map((pkg) => (
                    <Card key={pkg.id} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{pkg.type} - {pkg.size}</h4>
                        {pkg.style && <p className="text-sm text-gray-600">{pkg.style}</p>}
                        <p className="text-dark-cocoa font-bold">${pkg.price}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="btn-secondary text-sm px-3 py-1">Edit</button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Straws */}
              <div>
                <h3 className="heading-cooper text-xl mb-4">Straws</h3>
                <div className="space-y-3">
                  {mockStraws.map((straw) => (
                    <Card key={straw.id} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{straw.type}</h4>
                        <p className="text-dark-cocoa font-bold">${straw.price}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="btn-secondary text-sm px-3 py-1">Edit</button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="heading-cooper text-2xl">View Orders</h2>
              <button className="btn-secondary">Export Orders</button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-latte-sand">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-cocoa uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-cocoa uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-cocoa uppercase tracking-wider">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-cocoa uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-cocoa uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-cocoa uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dark-cocoa uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-cocoa">#{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.items}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-cocoa">${order.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-dark-cocoa hover:underline">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div>
            <h2 className="heading-cooper text-2xl mb-6">Reports Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <h3 className="text-lg font-semibold text-dark-cocoa mb-2">Total Orders</h3>
                <p className="text-3xl font-bold text-dark-cocoa">156</p>
                <p className="text-sm text-gray-600">+12% from last month</p>
              </Card>
              
              <Card>
                <h3 className="text-lg font-semibold text-dark-cocoa mb-2">Revenue</h3>
                <p className="text-3xl font-bold text-dark-cocoa">$4,289</p>
                <p className="text-sm text-gray-600">+8% from last month</p>
              </Card>
              
              <Card>
                <h3 className="text-lg font-semibold text-dark-cocoa mb-2">Avg Order Value</h3>
                <p className="text-3xl font-bold text-dark-cocoa">$27.50</p>
                <p className="text-sm text-gray-600">+3% from last month</p>
              </Card>
              
              <Card>
                <h3 className="text-lg font-semibold text-dark-cocoa mb-2">Active Users</h3>
                <p className="text-3xl font-bold text-dark-cocoa">89</p>
                <p className="text-sm text-gray-600">+15% from last month</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <h3 className="heading-cooper text-xl mb-4">Popular Smoothies</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Berry Bliss</span>
                    <span className="font-semibold">45 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Ocean Glow</span>
                    <span className="font-semibold">38 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Muscle Monkey</span>
                    <span className="font-semibold">32 orders</span>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="heading-cooper text-xl mb-4">Top Categories</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Classic</span>
                    <span className="font-semibold">42%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>High-Protein</span>
                    <span className="font-semibold">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Signature</span>
                    <span className="font-semibold">18%</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-dark-cocoa text-soft-cream py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="heading-cooper text-2xl">Mr.Smoothy Admin</h1>
            <p className="text-soft-cream opacity-80">Management Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-soft-cream hover:underline">
              View Site →
            </Link>
            <button
              onClick={handleLogout}
              className="bg-latte-sand text-dark-cocoa px-4 py-2 rounded-lg font-medium hover:bg-opacity-80"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-dark-cocoa text-soft-cream'
                  : 'bg-white text-dark-cocoa hover:bg-latte-sand'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ml-2 bg-latte-sand text-dark-cocoa px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
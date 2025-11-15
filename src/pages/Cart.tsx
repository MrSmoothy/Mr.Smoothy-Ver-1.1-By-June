import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, NutritionSummary } from '../types';
import { useStore } from '../store/useStore';
import Card from '../components/Card';
import NutritionSummary from '../components/NutritionSummary';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useStore();
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const packagingTotal = cart.reduce((sum, item) => 
    sum + ((item.packaging?.price || 0) * item.quantity), 0
  );
  const strawTotal = cart.reduce((sum, item) => 
    sum + ((item.straw?.price || 0) * item.quantity), 0
  );
  const grandTotal = subtotal + packagingTotal + strawTotal;

  // Calculate total nutrition
  const totalNutrition: NutritionSummary = cart.reduce(
    (total, item) => ({
      calories: total.calories + (item.nutrition.calories * item.quantity),
      protein: total.protein + (item.nutrition.protein * item.quantity),
      sugar: total.sugar + (item.nutrition.sugar * item.quantity),
    }),
    { calories: 0, protein: 0, sugar: 0 }
  );

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, quantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleConfirmOrder = () => {
    setShowConfirmModal(true);
  };

  const handleFinalConfirm = () => {
    // Mock order confirmation
    clearCart();
    navigate('/logout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="heading-cooper text-3xl mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any smoothies yet. Start exploring our menu!
          </p>
          <button
            onClick={() => navigate('/ready-menu')}
            className="btn-primary text-lg px-8 py-3"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-cooper text-4xl md:text-5xl mb-4">
            Cart Summary
          </h1>
          <p className="text-gray-600 text-lg">
            Review your order before checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <div className="flex items-center space-x-4">
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-latte-sand rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">🥤</span>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 className="heading-cooper text-lg mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {item.type === 'ready' ? 'Ready Menu' : 'Custom Smoothie'}
                      </p>
                      
                      {/* Nutrition Summary */}
                      <div className="mb-3">
                        <NutritionSummary nutrition={item.nutrition} size="sm" />
                      </div>

                      {/* Packaging & Straw */}
                      <div className="flex flex-wrap gap-2 text-sm">
                        {item.packaging && (
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            {item.packaging.type} - {item.packaging.size}
                          </span>
                        )}
                        {item.straw && (
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            {item.straw.type}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price and Quantity */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-dark-cocoa mb-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mb-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-dark-cocoa text-soft-cream rounded-full flex items-center justify-center hover:opacity-80"
                        >
                          -
                        </button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-dark-cocoa text-soft-cream rounded-full flex items-center justify-center hover:opacity-80"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <h2 className="heading-cooper text-2xl mb-6">Order Summary</h2>
                
                {/* Total Nutrition */}
                <div className="mb-6">
                  <h3 className="font-semibold text-dark-cocoa mb-3">Total Nutrition</h3>
                  <NutritionSummary nutrition={totalNutrition} size="sm" />
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Packaging</span>
                    <span>${packagingTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Straws</span>
                    <span>${strawTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-dark-cocoa">Grand Total</span>
                      <span className="text-2xl font-bold text-dark-cocoa">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleConfirmOrder}
                    className="w-full btn-primary text-lg py-3"
                  >
                    Confirm Order
                  </button>
                  
                  <button
                    onClick={() => navigate('/ready-menu')}
                    className="w-full btn-secondary"
                  >
                    Continue Shopping
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setShowConfirmModal(false)}
              />

              {/* Modal Content */}
              <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl z-10 p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h2 className="heading-cooper text-2xl mb-4">Order Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Your order has been successfully placed. Total amount: ${grandTotal.toFixed(2)}
                  </p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={handleFinalConfirm}
                      className="w-full btn-primary"
                    >
                      Complete Order
                    </button>
                    <button
                      onClick={() => setShowConfirmModal(false)}
                      className="w-full btn-secondary"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
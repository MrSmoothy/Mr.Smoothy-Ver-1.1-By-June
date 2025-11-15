import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const Logout = () => {
  const navigate = useNavigate();
  const { setUser, setAuthenticated, clearCart } = useStore();

  useEffect(() => {
    // Clear user data and cart
    setUser(null);
    setAuthenticated(false);
    clearCart();
  }, [setUser, setAuthenticated, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="heading-cooper text-3xl mb-4">Successfully Logged Out</h1>
          <p className="text-gray-600 mb-8">
            You have successfully logged out of your Mr.Smoothy account.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="btn-primary text-lg px-8 py-3"
        >
          Return to Home Page
        </button>
      </div>
    </div>
  );
};

export default Logout;
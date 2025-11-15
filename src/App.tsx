import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import LifestyleSelection from './pages/LifestyleSelection';
import ReadyMenu from './pages/ReadyMenu';
import CustomSmoothie from './pages/CustomSmoothie';
import Packaging from './pages/Packaging';
import Cart from './pages/Cart';
import Logout from './pages/Logout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-soft-cream">
        <NavBar />
        <main>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lifestyle" element={<LifestyleSelection />} />
            <Route path="/ready-menu" element={<ReadyMenu />} />
            <Route path="/custom-smoothie" element={<CustomSmoothie />} />
            <Route path="/packaging" element={<Packaging />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/logout" element={<Logout />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
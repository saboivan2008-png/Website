import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import USWShop from './pages/USWShop';
import PlaceholderPage from './pages/PlaceholderPage';
import PromoDrop from './pages/PromoDrop';
import USCSolidarity from './pages/USCSolidarity';
import USCRent from './pages/USCRent';
import USCWork from './pages/USCWork';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/promo" element={<PromoDrop />} />
          <Route path="/usw" element={<USWShop />} />
          <Route path="/usc-solidarity" element={<USCSolidarity />} />
          <Route path="/rent-a-wheel" element={<USCRent />} />
          <Route path="/usc-work" element={<USCWork />} />
          
          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/:pillar" element={<PlaceholderPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

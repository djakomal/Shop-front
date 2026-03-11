import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import SalesPage from './pages/SalesPage';
import InventairePage from './pages/InventairePage';
import AgentsPage from './pages/AgentsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Route publique */}
          <Route path="/login" element={<LoginPage />} />

          {/* Routes protégées */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/produits" element={<ProductsPage />} />
            <Route path="/ventes" element={<SalesPage />} />
            <Route path="/inventaire" element={<InventairePage />} />
            <Route path="/parametres" element={<SettingsPage />} />

            {/* Route admin seulement */}
            <Route
              path="/agents"
              element={
                <ProtectedRoute adminOnly>
                  <AgentsPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Redirection par défaut */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

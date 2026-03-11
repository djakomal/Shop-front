import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authAPI } from '../services/api';
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedToken = localStorage.getItem('boutique_token');
    const storedUser = localStorage.getItem('boutique_user');
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('boutique_token');
        localStorage.removeItem('boutique_user');
      }
    }
    setLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const res = await authAPI.login(email, password);
      const { token: newToken, user: newUser } = res.data;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('boutique_token', newToken);
      localStorage.setItem('boutique_user', JSON.stringify(newUser));
      return { success: true };
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return { success: false, message: error.response?.data?.message || 'Erreur de connexion' };
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('boutique_token');
    localStorage.removeItem('boutique_user');
  };
  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-slate-700" />
    </div>
  );
  return (
    <AuthContext.Provider value={{
      user, token, login, logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

import React, { useState, useEffect } from 'react';
import { authAPI } from './api';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { User, Shield, Users } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authAPI.isAuthenticated();
      const userData = authAPI.getCurrentUser();
      
      setIsAuthenticated(isAuth);
      setUser(userData);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    setUser(null);
    setCurrentView('login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">RecruiteHub</h1>
            </div>
            
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700 font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAuthenticated ? (
          <Profile user={user} />
        ) : (
          <div className="max-w-md mx-auto">
            <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
              <button
                onClick={() => setCurrentView('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'login'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Shield className="h-4 w-4 inline mr-2" />
                Login
              </button>
              <button
                onClick={() => setCurrentView('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'register'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <User className="h-4 w-4 inline mr-2" />
                Register
              </button>
            </div>

            {currentView === 'login' ? (
              <Login onAuthSuccess={handleAuthSuccess} />
            ) : (
              <Register onAuthSuccess={handleAuthSuccess} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
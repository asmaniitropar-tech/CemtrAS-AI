import React from 'react';
import { Menu, X, Factory, User, Moon, Sun, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import type { UserRole } from '../types';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedRole: UserRole | 'General AI';
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen, selectedRole }) => {
  const { user, isAuthenticated } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 p-3 md:p-4 shadow-lg flex-shrink-0 relative z-20">
      <div className="flex items-center justify-between">
        {/* Left Section - Enhanced Branding */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg transition-all duration-200 backdrop-blur-sm"
          >
            {sidebarOpen ? (
              <X className="text-gray-700 dark:text-gray-300" size={18} />
            ) : (
              <Menu className="text-gray-700 dark:text-gray-300" size={18} />
            )}
          </button>

          {/* Enhanced App Branding */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg blur-sm opacity-50"></div>
              <div className="relative p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg shadow-lg">
                <Factory className="text-white" size={16} />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="text-white w-2 h-2" />
              </div>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {selectedRole} 
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Enhanced Controls */}
        <div className="flex items-center gap-2">
          {/* Enhanced Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg transition-all duration-200 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <Sun className="text-yellow-500 w-4 h-4" />
            ) : (
              <Moon className="text-gray-600 w-4 h-4" />
            )}
          </button>

          {/* Enhanced User Section */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-2 py-1 bg-green-100/80 dark:bg-green-900/30 rounded-lg border border-green-200/50 dark:border-green-800/50 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-green-700 dark:text-green-400">
                Online & Ready
              </span>
            </div>

            {user ? (
              <div className="flex items-center gap-2 px-2 py-1 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200/50 dark:border-gray-700/50 shadow-lg backdrop-blur-sm">
                <span className="text-xs font-bold text-gray-900 dark:text-white hidden lg:inline">
                  {user.name}
                </span>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                  <User className="text-white" size={12} />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-2 py-1 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200/50 dark:border-gray-700/50 shadow-lg backdrop-blur-sm">
                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg">
                  <img 
                    src="/untitled (10).jpeg"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
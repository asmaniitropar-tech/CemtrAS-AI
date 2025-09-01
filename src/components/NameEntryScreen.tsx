import React, { useState } from 'react';
import { Factory, User, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NameEntryScreenProps {
  onComplete: () => void;
}

export const NameEntryScreen: React.FC<NameEntryScreenProps> = ({ onComplete }) => {
  const { authenticateWithName, isLoading, error, clearError } = useAuth();
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim().length < 2) {
      return;
    }

    const success = await authenticateWithName(name);
    if (success) {
      setTimeout(() => onComplete(), 500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    clearError();
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 border-4 border-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-indigo-500 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-4 border-purple-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-lg mx-auto relative z-10 space-y-8">
          {/* Enhanced Header */}
          <div className="text-center space-y-6">
            {/* Enhanced Logo with your actual logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-full blur-2xl"></div>
              <div className="relative p-4 bg-gradient-to-br from-white to-blue-50 rounded-3xl border-2 border-blue-200 shadow-2xl w-24 h-24 sm:w-32 sm:h-32 mx-auto flex items-center justify-center backdrop-blur-sm">
                {/* Your actual logo image */}
                <img 
                  src="/Logo.png" 
                  alt="CemtrAS AI Logo" 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl"
                  onError={(e) => {
                    // Fallback to Factory icon if logo fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback Factory icon (hidden by default) */}
                <div className="absolute inset-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg items-center justify-center" style={{ display: 'none' }}>
                  <Factory className="text-white w-8 h-8 sm:w-12 sm:h-12" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>

            {/* Enhanced Branding */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CemtrAS AI
              </h1>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 max-w-16 sm:max-w-24"></div>
                <div className="px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg">
                  AI-DRIVEN ENGINEERING
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 max-w-16 sm:max-w-24"></div>
              </div>
              <p className="text-base sm:text-lg text-slate-600 font-medium">Enter your name to access all premium features</p>
            </div>
          </div>

          {/* Enhanced Name Entry Form */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-slate-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 sm:py-6 px-6 sm:px-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-3">
                <User size={20} className="sm:w-6 sm:h-6" />
                Welcome! What's your name?
              </h2>
            </div>

            <div className="p-6 sm:p-8">
              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6 text-center backdrop-blur-sm">
                  <p className="text-red-700 font-bold text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Enhanced Name Input */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full pl-14 pr-6 py-4 sm:py-5 border-2 border-slate-300 rounded-2xl 
                             focus:border-blue-500 focus:outline-none transition-all duration-200
                             font-bold text-lg bg-white/80 backdrop-blur-sm shadow-lg
                             hover:shadow-xl focus:shadow-xl"
                    required
                    minLength={2}
                    disabled={isLoading}
                  />
                </div>

                {/* Character Count */}
                <div className="text-right">
                  <span className={`text-xs font-bold ${
                    name.length >= 2 ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {name.length}/2 minimum characters
                  </span>
                </div>

                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  disabled={name.trim().length < 2 || isLoading}
                  className="w-full py-4 sm:py-5 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-indigo-700
                           text-white font-black text-base sm:text-lg rounded-2xl transition-all duration-300 shadow-xl
                           hover:from-blue-700 hover:to-indigo-800 hover:shadow-2xl hover:-translate-y-1
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                           flex items-center justify-center gap-3 sm:gap-4"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Getting Started...
                    </>
                  ) : (
                    <>
                      <Zap size={20} className="sm:w-6 sm:h-6" />
                      Access All Features
                      <ArrowRight size={20} className="sm:w-6 sm:h-6" />
                    </>
                  )}
                </button>
              </form>

              {/* Enhanced Features List */}
              <div className="mt-8 sm:mt-10 space-y-4">
                <h4 className="text-sm font-black text-slate-700 text-center mb-4 sm:mb-6 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  🎉 You'll get instant access to:
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { icon: '🤖', text: 'General AI Assistant', color: 'bg-purple-100 text-purple-700' },
                    { icon: '📎', text: 'File Upload Support', color: 'bg-blue-100 text-blue-700' },
                    { icon: '💾', text: 'Chat History & Sessions', color: 'bg-green-100 text-green-700' },
                    { icon: '⚡', text: 'All Expert Areas', color: 'bg-yellow-100 text-yellow-700' }
                  ].map((feature, index) => (
                    <div key={index} className={`${feature.color} rounded-xl p-3 text-center font-bold backdrop-blur-sm border border-current/20`}>
                      <div className="text-base sm:text-lg mb-1">{feature.icon}</div>
                      <div className="text-xs">{feature.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attribution */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Made By <span className="font-bold text-blue-600">Vipul</span></span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Idea By <span className="font-bold text-purple-600">Akanksha</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
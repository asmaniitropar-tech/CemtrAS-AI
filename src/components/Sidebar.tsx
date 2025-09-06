import React, { useState } from 'react';
import { User, LogOut, X, Plus, MessageSquare, Zap, History } from 'lucide-react';
import { RoleSelector } from './RoleSelector';
import { useAuth } from '../contexts/AuthContext';
import { useChatHistory } from '../contexts/ChatHistoryContext';
import type { UserRole, ChatHistory } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: UserRole | 'General AI';
  onRoleChange: (role: UserRole | 'General AI') => void;
  onLoadChat: (history: ChatHistory) => void;
  onNewChat: () => void;
  messageCount: number;
  isLoading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  selectedRole,
  onRoleChange,
  onLoadChat,
  onNewChat,
  messageCount,
  isLoading
}) => {
  const { user, logout } = useAuth();
  const { histories } = useChatHistory();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    onClose();
    window.location.reload();
  };

  const handleChatSelect = (chatId: string) => {
    const history = histories.find(h => h.id === chatId);
    if (history) {
      onLoadChat(history);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          fixed lg:static z-50 lg:z-auto
          w-72 md:w-80 h-full
          bg-white/90 dark:bg-gray-900/90 backdrop-blur-md
          border-r border-gray-200/50 dark:border-gray-700/50
          flex flex-col shadow-2xl lg:shadow-xl
          transition-all duration-300 ease-in-out
          top-0 lg:top-auto
        `}
      >
        {/* User Section (10%) */}
        <div className="basis-[10%] p-4 md:p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex-shrink-0">
          {user && (
            <div className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                <User className="text-white" size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {user.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                    Premium Access
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="text-gray-400 hover:text-red-500" size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Role Selector (60%) */}
        <div className="basis-[60%] p-4 md:p-6 overflow-y-auto">
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            Select Expertise
          </h4>
          <RoleSelector 
            selectedRole={selectedRole}
            onRoleChange={onRoleChange}
          />
        </div>

        {/* New Chat Button (10%) */}
        <div className="basis-[10%] p-4 md:p-6 flex items-center">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl md:rounded-2xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm md:text-base"
          >
            <Plus size={18} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat History + Stats + Footer (20%) */}
        <div className="basis-[20%] p-4 md:p-6 flex flex-col overflow-y-auto">
          <div className="flex-1 min-h-0">
            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-4 flex items-center gap-2">
              <History className="w-4 h-4 text-purple-500" />
              Chat History
            </h4>
            <div className="space-y-2">
              {histories.length === 0 ? (
                <div className="text-center py-4">
                  <MessageSquare className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    No chat history yet
                  </p>
                </div>
              ) : (
                histories.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleChatSelect(chat.id)}
                    className="w-full text-left p-3 md:p-4 bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80 rounded-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md group"
                  >
                    <h5 className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {chat.title}
                    </h5>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
                      {chat.messages.length} messages
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Logout Modal */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <LogOut className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Confirm Logout
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Are you sure you want to logout? Your chat history will be preserved for when you return.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-4 px-6 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl font-bold hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

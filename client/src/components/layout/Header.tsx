import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Link as LinkIcon, Settings, LogOut, Menu, X, Plus, LayoutDashboard, BarChart3, LinkIcon as LinksIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/links', label: 'My Links', icon: LinksIcon },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Side: Logo and Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to={user ? '/dashboard' : '/'} className="flex items-center">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg">
                <LinkIcon className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">ShortLink</span>
            </Link>

            {/* Navigation Links (Visible if user is authenticated) */}
            {user && (
              <nav className="hidden md:ml-8 md:flex md:space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-amber-50 text-amber-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right Side: User Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                {/* Create Link Button - Desktop */}
                <Link
                  to="/links/create"
                  className="hidden sm:inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New Link
                </Link>

                {/* User Dropdown */}
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to="/settings"
                    className={`p-2 rounded-lg transition-colors ${
                      isActive('/settings') ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                    }`}
                    title="Settings"
                  >
                    <Settings className="h-5 w-5" />
                  </Link>

                  <div className="h-6 w-px bg-gray-200" />

                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-sm font-medium text-gray-700 truncate max-w-[120px]">{user.name || user.email}</p>
                      <p className="text-xs text-amber-600">{user.subscription || 'FREE'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => logout()}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {user && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium ${
                      isActive(item.path)
                        ? 'bg-amber-50 text-amber-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="border-t border-gray-100 pt-3 mt-3">
                <Link
                  to="/links/create"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium"
                >
                  <Plus className="w-5 h-5 mr-3" />
                  Create New Link
                </Link>
              </div>
              <div className="border-t border-gray-100 pt-3 mt-3 space-y-1">
                <Link
                  to="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
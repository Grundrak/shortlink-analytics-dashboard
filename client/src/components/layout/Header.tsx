import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Link as LinkIcon, BarChart, Settings, LogOut } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Side: Logo and Navigation */}
          <div className="flex">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <LinkIcon className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">ShortLink</span>
            </Link>

            {/* Navigation Links (Visible if user is authenticated) */}
            {user && (
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/dashboard"
                  className="border-primary text-gray-700 hover:border-amber-500 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/analytics"
                  className="border-transparent text-gray-500 hover:border-amber-500 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Analytics
                </Link>
                <Link
                  to="/links"
                  className="border-transparent text-gray-500 hover:border-amber-500 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Links
                </Link>
              </nav>
            )}
          </div>

          {/* Right Side: User Actions */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Settings Icon */}
                <Link
                  to="/settings"
                  className="p-2 text-gray-600 hover:text-primary transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="h-6 w-6" />
                </Link>

                {/* Logout Button */}
                <button
                  onClick={() => logout()}
                  className="p-2 text-gray-600 hover:text-primary transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-6 w-6" />
                </button>

                {/* User Plan Badge */}
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                    {user.plan}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                {/* Login Link */}
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>

                {/* Sign Up Button */}
                <Link
                  to="/signup"
                  className="bg-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
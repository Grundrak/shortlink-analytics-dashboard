import { Link } from 'react-router-dom';
import { Link2, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ShortLink</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              Transform your long URLs into powerful, trackable short links with advanced analytics.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@shortlink.com"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-gray-400 hover:text-amber-400 transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-amber-400 transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/api" className="text-gray-400 hover:text-amber-400 transition-colors">API</Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-amber-400 transition-colors">Documentation</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-amber-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-amber-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-amber-400 transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-amber-400 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-amber-400 transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/security" className="text-gray-400 hover:text-amber-400 transition-colors">Security</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} ShortLink. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/status" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                System Status
              </Link>
              <Link to="/support" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
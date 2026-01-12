import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 text-lg mb-8">
          The link you're looking for might have been removed, deleted, or possibly never existed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <button className="w-full sm:w-auto flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              <Home className="w-4 h-4" />
              Go to Home
            </button>
          </Link>
          <Link to="/dashboard">
            <button className="w-full sm:w-auto border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

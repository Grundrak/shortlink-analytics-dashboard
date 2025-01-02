
import { Search, Calendar, ArrowDownUp } from 'lucide-react';

export function LinkFilters() {
  return (
    <div className="mt-6 bg-white shadow rounded-lg p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="search" className="sr-only">Search links</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              id="search"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search links..."
            />
          </div>
        </div>

        <div>
          <label htmlFor="dateRange" className="sr-only">Date range</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="dateRange"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>All time</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="sort" className="sr-only">Sort by</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <ArrowDownUp className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="sort"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            >
              <option>Most clicks</option>
              <option>Newest first</option>
              <option>Oldest first</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
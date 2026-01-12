
import { useState, useEffect } from 'react';
import { Globe, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { analyticsApi } from '../../api/analyticsApi';
import { toast } from 'sonner';

interface Props {
  linkId: string | undefined;
  timeRange?: string;
}

interface LocationData {
  location: string;
  country: string;
  city: string;
  visits: number;
  percentage: number;
  coordinates?: [number, number];
}

const getCountryFlag = (country: string): string => {
  const flagEmojis: { [key: string]: string } = {
    'United States': '🇺🇸',
    'United Kingdom': '🇬🇧',
    'Germany': '🇩🇪',
    'France': '🇫🇷',
    'Canada': '🇨🇦',
    'Australia': '🇦🇺',
    'Japan': '🇯🇵',
    'India': '🇮🇳',
    'China': '🇨🇳',
    'Brazil': '🇧🇷',
    'Italy': '🇮🇹',
    'Spain': '🇪🇸',
    'Netherlands': '🇳🇱',
    'Sweden': '🇸🇪',
    'Norway': '🇳🇴',
    'Local Development': '🏠'
  };
  return flagEmojis[country] || '🌍';
};

export function LocationMap({ linkId, timeRange = '30d' }: Props) {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalVisits, setTotalVisits] = useState(0);
  const [uniqueCountries, setUniqueCountries] = useState(0);

  useEffect(() => {
    const fetchLocationStats = async () => {
      if (!linkId) {
        // Fetch user-wide location stats
        try {
          const response = await analyticsApi.getUserAnalyticsSummary(timeRange);
          const data = response.data;
          
          // Aggregate location data from all URLs
          const locationCounts: { [key: string]: number } = {};
          let total = 0;
          
          data.urls?.forEach((url: { analytics?: { locations?: Record<string, number> } }) => {
            const analytics = url.analytics;
            if (analytics && analytics.locations) {
              Object.entries(analytics.locations).forEach(([location, count]) => {
                locationCounts[location] = (locationCounts[location] || 0) + count;
                total += count as number;
              });
            }
          });
          
          setTotalVisits(total);
          processLocationData(locationCounts, total);
        } catch (error) {
          console.error('Error fetching user location stats:', error);
          toast.error('Failed to load location statistics');
        }
      } else {
        // Fetch location stats for specific URL
        try {
          const response = await analyticsApi.getUrlAnalytics(linkId);
          const analytics = response.data.summary;
          
          if (analytics && analytics.locations) {
            const total = Object.values(analytics.locations).reduce((sum: number, count) => sum + (count as number), 0);
            setTotalVisits(total);
            processLocationData(analytics.locations, total);
          }
        } catch (error) {
          console.error('Error fetching URL location stats:', error);
          toast.error('Failed to load location statistics');
        }
      }
      setLoading(false);
    };

    fetchLocationStats();
  }, [linkId, timeRange]);

  const processLocationData = (locationCounts: { [key: string]: number }, total: number) => {
    const locationData: LocationData[] = Object.entries(locationCounts)
      .map(([location, visits]) => {
        const percentage = total > 0 ? (visits / total * 100) : 0;
        
        // Parse location string to extract city and country
        const locationParts = location.split(', ');
        const country = locationParts[locationParts.length - 1] || 'Unknown';
        const city = locationParts[0] || 'Unknown';
        
        return {
          location,
          country,
          city,
          visits,
          percentage: Math.round(percentage * 10) / 10,
        };
      })
      .filter(location => location.visits > 0)
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10); // Show top 10 locations
    
    setLocations(locationData);
    
    // Count unique countries
    const countries = new Set(locationData.map(loc => loc.country));
    setUniqueCountries(countries.size);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Geographic Distribution</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="h-5 w-5 bg-gray-200 rounded mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Geographic Distribution</h2>
        <div className="text-center py-8">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No location data available</p>
          <p className="text-sm text-gray-400 mt-1">Start getting clicks to see geographic analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Geographic Distribution</h2>
        <span className="text-sm text-gray-500">{totalVisits.toLocaleString()} total visits</span>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Globe className="h-5 w-5 text-blue-600 mr-1" />
            <span className="text-2xl font-bold text-blue-600">{uniqueCountries}</span>
          </div>
          <p className="text-sm text-gray-600">Countries</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <MapPin className="h-5 w-5 text-green-600 mr-1" />
            <span className="text-2xl font-bold text-green-600">{locations.length}</span>
          </div>
          <p className="text-sm text-gray-600">Cities</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {locations.map((location, index) => (
          <motion.div
            key={location.location}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center group hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
          >
            <div className="flex items-center mr-3">
              <span className="text-lg mr-2">{getCountryFlag(location.country)}</span>
              <MapPin className="h-4 w-4 text-gray-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="text-sm font-medium text-gray-900">{location.city}</span>
                  <span className="text-xs text-gray-500 ml-2">{location.country}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{location.visits.toLocaleString()}</span>
                  <span className="text-sm font-medium text-gray-700">{location.percentage}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${location.percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Countries Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Top Countries</h3>
        <div className="flex flex-wrap gap-2">
          {locations.slice(0, 5).map((location, index) => (
            <motion.div
              key={location.country}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs"
            >
              <span>{getCountryFlag(location.country)}</span>
              <span>{location.country}</span>
              <span className="font-medium">{location.percentage}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { ExternalLink, Globe, Search, Share2, MessageCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { analyticsApi } from '../../api/analyticsApi';
import { toast } from 'sonner';

interface Props {
  linkId: string | undefined;
  timeRange?: string;
}

interface ReferrerData {
  source: string;
  visits: number;
  percentage: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const getReferrerIcon = (source: string) => {
  const sourceLower = source.toLowerCase();
  if (sourceLower === 'direct') return Globe;
  if (sourceLower.includes('google') || sourceLower.includes('bing') || sourceLower.includes('search')) return Search;
  if (sourceLower.includes('twitter') || sourceLower.includes('x.com')) return MessageCircle;
  if (sourceLower.includes('facebook') || sourceLower.includes('linkedin') || sourceLower.includes('instagram')) return Users;
  if (sourceLower.includes('social')) return Share2;
  return ExternalLink;
};

const getReferrerColor = (source: string) => {
  const sourceLower = source.toLowerCase();
  if (sourceLower === 'direct') return 'bg-gray-500';
  if (sourceLower.includes('google')) return 'bg-blue-500';
  if (sourceLower.includes('twitter') || sourceLower.includes('x.com')) return 'bg-sky-500';
  if (sourceLower.includes('facebook')) return 'bg-blue-600';
  if (sourceLower.includes('linkedin')) return 'bg-blue-700';
  if (sourceLower.includes('instagram')) return 'bg-pink-500';
  if (sourceLower.includes('youtube')) return 'bg-red-500';
  return 'bg-purple-500';
};

export function ReferrerStats({ linkId, timeRange = '30d' }: Props) {
  const [referrers, setReferrers] = useState<ReferrerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalVisits, setTotalVisits] = useState(0);

  useEffect(() => {
    const fetchReferrerStats = async () => {
      if (!linkId) {
        // Fetch user-wide referrer stats
        try {
          const response = await analyticsApi.getUserAnalyticsSummary(timeRange);
          const data = response.data;
          
          // Aggregate referrer data from all URLs
          const referrerCounts: { [key: string]: number } = {};
          let total = 0;
          
          data.urls?.forEach((url: { analytics?: { referrers?: Record<string, number> } }) => {
            const analytics = url.analytics;
            if (analytics && analytics.referrers) {
              Object.entries(analytics.referrers).forEach(([referrer, count]) => {
                referrerCounts[referrer] = (referrerCounts[referrer] || 0) + count;
                total += count;
              });
            }
          });
          
          setTotalVisits(total);
          processReferrerData(referrerCounts, total);
        } catch (error) {
          console.error('Error fetching user referrer stats:', error);
          toast.error('Failed to load referrer statistics');
        }
      } else {
        // Fetch referrer stats for specific URL
        try {
          const response = await analyticsApi.getUrlAnalytics(linkId);
          const analytics = response.data.summary;
          
          if (analytics && analytics.referrers) {
            const total = Object.values(analytics.referrers).reduce((sum: number, count) => sum + (count as number), 0);
            setTotalVisits(total);
            processReferrerData(analytics.referrers, total);
          }
        } catch (error) {
          console.error('Error fetching URL referrer stats:', error);
          toast.error('Failed to load referrer statistics');
        }
      }
      setLoading(false);
    };

    fetchReferrerStats();
  }, [linkId, timeRange]);

  const processReferrerData = (referrerCounts: { [key: string]: number }, total: number) => {
    const referrerData: ReferrerData[] = Object.entries(referrerCounts)
      .map(([source, visits]) => {
        const percentage = total > 0 ? (visits / total * 100) : 0;
        
        return {
          source: source === 'direct' ? 'Direct' : source,
          visits,
          percentage: Math.round(percentage * 10) / 10,
          icon: getReferrerIcon(source),
          color: getReferrerColor(source)
        };
      })
      .filter(referrer => referrer.visits > 0)
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 8); // Show top 8 referrers
    
    setReferrers(referrerData);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Top Referrers</h2>
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

  if (referrers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Top Referrers</h2>
        <div className="text-center py-8">
          <ExternalLink className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No referrer data available</p>
          <p className="text-sm text-gray-400 mt-1">Start getting clicks to see referrer analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Top Referrers</h2>
        <span className="text-sm text-gray-500">{totalVisits.toLocaleString()} total visits</span>
      </div>
      
      <div className="space-y-4">
        {referrers.map((referrer, index) => {
          const IconComponent = referrer.icon;
          return (
            <motion.div
              key={referrer.source}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center group hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
            >
              <div className="flex items-center mr-3">
                <IconComponent className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{referrer.source}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{referrer.visits.toLocaleString()}</span>
                    <span className="text-sm font-medium text-gray-700">{referrer.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${referrer.percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`${referrer.color} h-2 rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-600">
              {referrers.find(r => r.source.toLowerCase() === 'direct')?.percentage || 0}%
            </p>
            <p className="text-sm text-gray-500">Direct Traffic</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {referrers.filter(r => r.source.toLowerCase() !== 'direct')
                .reduce((sum, r) => sum + r.percentage, 0).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500">Referral Traffic</p>
          </div>
        </div>
      </div>
    </div>
  );
}
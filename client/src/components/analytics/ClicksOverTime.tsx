
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

interface Props {
  linkId: string | undefined;
}

interface ClickData {
  date: string;
  clicks: number;
}

export function ClicksOverTime({ linkId }: Props) {
  const [data, setData] = useState<ClickData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClicksOverTime = async () => {
      if (!linkId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // For now, we'll create sample data since the backend doesn't have time-series data yet
        // In a real implementation, you'd call something like:
        // const response = await analyticsApi.getUrlAnalyticsByTimeRange(linkId, { days: 7 });
        
        // Generate sample data for the last 7 days
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return {
            date: date.toISOString().split('T')[0],
            clicks: Math.floor(Math.random() * 200) + 50
          };
        });

        setData(last7Days);
      } catch (err) {
        console.error('Error fetching clicks over time:', err);
        toast.error('Failed to load clicks over time data');
        
        // Fallback data
        setData([
          { date: '2024-03-01', clicks: 120 },
          { date: '2024-03-02', clicks: 180 },
          { date: '2024-03-03', clicks: 240 },
          { date: '2024-03-04', clicks: 200 },
          { date: '2024-03-05', clicks: 280 },
          { date: '2024-03-06', clicks: 320 },
          { date: '2024-03-07', clicks: 290 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchClicksOverTime();
  }, [linkId]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Clicks Over Time</h2>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Clicks Over Time</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="clicks" 
              stroke="#4F46E5" 
              fill="#4F46E5" 
              fillOpacity={0.1} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
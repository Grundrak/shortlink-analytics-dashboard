
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  linkId: string | undefined;
}

const data = [
  { date: '2024-03-01', clicks: 1200 },
  { date: '2024-03-02', clicks: 1800 },
  { date: '2024-03-03', clicks: 2400 },
  { date: '2024-03-04', clicks: 2000 },
  { date: '2024-03-05', clicks: 2800 },
  { date: '2024-03-06', clicks: 3200 },
  { date: '2024-03-07', clicks: 2900 },
];

export function ClicksOverTime({ linkId }: Props) {
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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Updated color palette usage
const colors = {
  primary: '#4F46E5',    // Indigo
  secondary: '#10B981',  // Emerald Green
  accent: '#F59E0B',     // Amber
  dark: '#1F2937',       // Slate Gray
  light: '#F3F4F6',      // Light Gray
};

const data = [
  { date: '2024-01', clicks: 4000 },
  { date: '2024-02', clicks: 3000 },
  { date: '2024-03', clicks: 2000 },
  { date: '2024-04', clicks: 2780 },
  { date: '2024-05', clicks: 1890 },
  { date: '2024-06', clicks: 2390 },
];

export function ClicksChart() {
  return (
    <motion.div
      className="bg-white rounded-lg shadow p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-lg font-medium text-gray-900 mb-4">Click Trends</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.light} />
            <XAxis 
              dataKey="date" 
              stroke={colors.dark} 
              tick={{ fontSize: 12 }}
              axisLine={false}
            />
            <YAxis 
              stroke={colors.dark} 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: colors.light, border: `1px solid ${colors.primary}` }}
              itemStyle={{ color: colors.primary }}
              labelStyle={{ color: colors.primary }}
            />
            <Area 
              type="monotone" 
              dataKey="clicks" 
              stroke={colors.primary} 
              fill="url(#colorClicks)" 
              fillOpacity={1} 
              activeDot={{ r: 8 }}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
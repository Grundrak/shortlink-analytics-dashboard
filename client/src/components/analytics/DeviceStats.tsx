
import { Smartphone, Laptop, Tablet } from 'lucide-react';

interface Props {
  linkId: string | undefined;
}

const devices = [
  { name: 'Mobile', value: 45, icon: Smartphone },
  { name: 'Desktop', value: 35, icon: Laptop },
  { name: 'Tablet', value: 20, icon: Tablet },
];

export function DeviceStats({ linkId }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Device Distribution</h2>
      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.name} className="flex items-center">
            <device.icon className="h-5 w-5 text-gray-400 mr-3" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{device.name}</span>
                <span className="text-sm text-gray-500">{device.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${device.value}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
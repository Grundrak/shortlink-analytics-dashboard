export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'FREE' | 'PREMIUM';
  createdAt: string;
}

export interface ShortLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  customAlias?: string;
  userId: string;
  clicks: number;
  createdAt: string;
  expiresAt?: string;
  customDomain?: string;
}

export interface ClickAnalytics {
  id: string;
  shortLinkId: string;
  timestamp: string;
  country: string;
  city: string;
  browser: string;
  device: string;
  os: string;
  referrer: string;
}

export interface DashboardStats {
  totalClicks: number;
  totalLinks: number;
  activeLinks: number;
  topCountries: Array<{ country: string; clicks: number }>;
  clicksTrend: Array<{ date: string; clicks: number }>;
}
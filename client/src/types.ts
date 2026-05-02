export interface Asset {
  id: number;
  name: string;
  category: string;
  status: 'operational' | 'maintenance' | 'offline';
}
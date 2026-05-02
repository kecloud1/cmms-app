import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

interface Asset {
  id: number;
  name: string;
  category: string;
  status: 'operational' | 'maintenance' | 'offline';
}

const assets: Asset[] = [
  { id: 1, name: 'Air Handler Unit 1', category: 'HVAC', status: 'operational' },
  { id: 2, name: 'Chiller Pump A', category: 'Mechanical', status: 'maintenance' },
  { id: 3, name: 'Generator 2', category: 'Electrical', status: 'operational' },
];




app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/api/assets', (req, res) => {
    res.json(assets);
});









app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';


const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/assets', async (req, res) => {
  const assets = await prisma.asset.findMany({
    orderBy: { createdAt: 'asc' }
  });
  res.json(assets);
});

app.post('/api/assets', async (req, res) => {
  const { name, category, status } = req.body;

  if (!name || !category || !status) {
    res.status(400).json({ error: 'name, category and status are required' });
    return;
  }

  const newAsset = await prisma.asset.create({
    data: { name, category, status }
  });

  res.status(201).json(newAsset);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
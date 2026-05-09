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

// === Assets ====================================================================
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

app.delete('/api/assets/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }

  await prisma.asset.delete({
    where: { id }
  });

  res.status(204).send();
});
// ===============================================================================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
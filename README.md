# CMMS App

A full-stack Computerized Maintenance Management System (CMMS) / Asset Management web application built as a portfolio project. Inspired by systems like FIIX, this app is designed to track physical assets, manage work orders, and support maintenance operations.

---

## Tech Stack

### Frontend

- **React 19** with **TypeScript**
- **Vite** — development server and build tool
- Deployed on **Vercel**

### Backend

- **Node.js** with **Express**
- **TypeScript**
- **Prisma ORM** (v6) — schema management and type-safe database queries
- Deployed on **Railway**

### Database

- **PostgreSQL** — managed instance on Railway

---

## Project Structure

```
cmms-app/
├── client/                   # React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx           # Root component, owns shared state
│   │   ├── AssetList.tsx     # Fetches and displays assets
│   │   ├── AddAssetForm.tsx  # Form to create a new asset
│   │   └── types.ts          # Shared TypeScript interfaces
│   ├── .env                  # Local environment variables (not committed)
│   ├── index.html
│   └── vite.config.ts
│
├── server/                   # Node + Express API
│   ├── src/
│   │   └── index.ts          # Express app, route definitions
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema definition
│   │   └── migrations/       # Migration history (committed)
│   ├── prisma.config.ts      # Prisma configuration
│   ├── .env                  # Local environment variables (not committed)
│   └── tsconfig.json
│
└── README.md
```

---

## Local Development Setup

### Prerequisites

- Windows with **WSL2** (Ubuntu) installed
- **Node.js** via nvm (LTS version)
- **Git** configured with SSH access to GitHub
- **VS Code** with the WSL extension

### 1. Clone the repository

```bash
git clone git@github.com:yourusername/cmms-app.git
cd cmms-app
```

### 2. Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Set up PostgreSQL

Start the PostgreSQL service in Ubuntu:

```bash
sudo service postgresql start
```

Connect as the superuser and create the database and user:

```bash
sudo -u postgres psql
```

```sql
CREATE USER your_db_user WITH PASSWORD 'your_db_password';
CREATE DATABASE cmms_db OWNER your_db_user;
GRANT ALL PRIVILEGES ON DATABASE cmms_db TO your_db_user;
ALTER USER your_db_user CREATEDB;
\q
```

### 4. Configure environment variables

Create a `.env` file in the `server` folder:

```
DATABASE_URL="postgresql://your_db_user:your_db_password@localhost:5432/cmms_db"
```

Create a `.env` file in the `client` folder:

```
VITE_API_URL=http://localhost:3000
```

### 5. Run database migrations

```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
```

### 6. Start the development servers

In one terminal (server):

```bash
cd server
npm run dev
```

In a second terminal (client):

```bash
cd client
npm run dev
```

The React app will be available at `http://localhost:5173`.  
The Express API will be available at `http://localhost:3000`.

> **Note:** You will need to run `sudo service postgresql start` each time you open a fresh Ubuntu session, as WSL does not persist services across restarts.

---

## API Reference

Base URL (production): `https://cmms-app-production-c5d6.up.railway.app`

### Health check

```
GET /api/health
```

Response:

```json
{ "status": "ok" }
```

### Get all assets

```
GET /api/assets
```

Response:

```json
[
  {
    "id": 1,
    "name": "Air Handler Unit 1",
    "category": "HVAC",
    "status": "operational",
    "createdAt": "2026-05-02T22:00:00.000Z"
  }
]
```

### Create an asset

```
POST /api/assets
Content-Type: application/json
```

Request body:

```json
{
  "name": "Chiller Pump A",
  "category": "Mechanical",
  "status": "maintenance"
}
```

Response `201 Created`:

```json
{
  "id": 2,
  "name": "Chiller Pump A",
  "category": "Mechanical",
  "status": "maintenance",
  "createdAt": "2026-05-02T22:05:00.000Z"
}
```

Asset status must be one of: `operational`, `maintenance`, `offline`.

---

## Database Schema

```prisma
model Asset {
  id        Int      @id @default(autoincrement())
  name      String
  category  String
  status    String
  createdAt DateTime @default(now())
}
```

Migrations are managed with Prisma Migrate. To add a new model or field:

1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name description_of_change`
3. Run `npx prisma generate`
4. Commit the updated schema and migration files

---

## Deployment

### Backend (Railway)

The Express API and PostgreSQL database are hosted on Railway.

- Deploys automatically on every push to `main`
- Build command: `npm install && npm run build`
- Start command: `npx prisma migrate deploy && node dist/index.js`
- Environment variables configured in Railway dashboard:
  - `DATABASE_URL` — provided by Railway's managed PostgreSQL service
  - `NODE_ENV` — set to `production`

Prisma migrations run automatically on each deploy before the server starts, keeping the production database schema in sync.

### Frontend (Vercel)

The React app is hosted on Vercel.

- Deploys automatically on every push to `main`
- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables configured in Vercel dashboard:
  - `VITE_API_URL` — set to the Railway API URL

---

## Development Workflow

The standard workflow for adding a new feature:

1. Start both dev servers locally
2. Build and test the API endpoint first (use Thunder Client in VS Code)
3. Build the React component that consumes it
4. Verify end to end in the browser
5. Commit with a descriptive message
6. Push to GitHub — both Railway and Vercel deploy automatically

```bash
git add .
git commit -m "description of what this commit does"
git push
```

---

## Roadmap

### Phase 2 — Auth & Structure

- User authentication with JWT tokens
- Protected API routes
- Login/register UI

### Phase 3 — Core CMMS Features

- Work order creation and assignment
- Asset status tracking and history
- Maintenance schedules

### Phase 4 — Polish

- Search and filtering
- Dashboard with summary metrics
- PDF export for work orders

---

## Author

Kelsey — Software Engineer  
Built as a full-stack portfolio project to practice modern web development from local setup through production deployment.

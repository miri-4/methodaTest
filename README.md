# Methodia - Configuration Management System

A status workflow configuration management system with dynamic status creation, transitions, and initial status selection.

## Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn**

### Installing Node.js

#### Windows
1. Visit: [nodejs.org](https://nodejs.org/)
2. Download the LTS version
3. Run the installer and follow the installation steps
4. Open a new CMD and verify:
```cmd
node --version
npm --version
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
node --version
npm --version
```

#### Linux (Fedora/RHEL)
```bash
sudo dnf install nodejs npm
node --version
npm --version
```

---

## Project Setup

### Step 1: Navigate to Project Directory

```bash
cd c:\Users\ASUS\Desktop\methodaTest
# or on Linux:
cd ~/path/to/methodaTest
```

### Step 2: Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

---

## Running the Project

### Option 1: Running Backend and Frontend Separately (Recommended for Development)

#### Starting Backend

**Windows (CMD):**
```cmd
cd backend
npm run dev
```

**Linux (Terminal):**
```bash
cd backend
npm run dev
```

Server will run on: `http://localhost:5000`
Database file: `backend/config.db`

#### Starting Frontend

Open a **new** terminal/CMD window:

**Windows:**
```cmd
cd frontend
npm run dev
```

**Linux:**
```bash
cd frontend
npm run dev
```

Application will run on: `http://localhost:5173`

---

## Environment Variables (.env)

### Backend - `backend/.env` (Optional)
```
PORT=5000
NODE_ENV=development
```

### Frontend - `frontend/.env` (Optional)
```
VITE_API_URL=http://localhost:5000
```

---

## Production Build

### Frontend

```bash
cd frontend
npm run build
```

Creates optimized files in `dist/` directory.

### Backend

```bash
cd backend
npm run build
```

---

## Project Structure

```
methodaTest/
├── README.md
├── .gitignore
├── backend/
│   ├── server.ts          # Main server file
│   ├── config.db          # SQLite database
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts       # Server entry point
│       ├── database/
│       │   └── db.ts
│       ├── routes/
│       │   ├── config.ts
│       │   ├── index.ts
│       │   ├── statuses.ts
│       │   └── transitions.ts
│       └── types/
│           └── index.ts
└── frontend/
    ├── package.json
    ├── vite.config.ts
    ├── index.html
    └── src/
        ├── main.tsx       # Frontend entry point
        ├── App.tsx
        ├── services/
        │   └── api.ts
        ├── hooks/
        │   └── useConfigManager.ts
        ├── components/
        │   ├── Header/
        │   ├── StatusPanel/
        │   ├── TransitionPanel/
        │   └── Footer/
        └── types/
            └── index.ts
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/config` | Fetch all configuration (statuses, transitions, initial status) |
| POST | `/api/statuses` | Create a new status |
| DELETE | `/api/statuses/:id` | Delete a status |
| POST | `/api/transitions` | Create a new transition |
| DELETE | `/api/transitions/:id` | Delete a transition |
| PUT | `/api/initial-status` | Set the initial status |
| POST | `/api/reset` | Reset all configuration |

---

## Troubleshooting

### ❌ "npm: command not found" / "node: command not found"
- Verify Node.js was installed correctly
- Open a **new** CMD/Terminal window after installation
- On Windows: Ensure Node.js was added to PATH
- Try restarting your computer

### ❌ Port 5000 already in use (Backend)
```cmd
# Windows - Find and close the process:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux:
lsof -i :5000
kill -9 <PID>
```

Alternatively, set a different port in `.env`:
```
PORT=5001
```

### ❌ Port 5173 already in use (Frontend)
Update `frontend/vite.config.ts`:
```typescript
export default {
  server: {
    port: 5174
  }
}
```

Or close the existing process using that port.

### ❌ Database errors
```bash
# Delete the database and start fresh:
# Windows:
del backend\config.db

# Linux:
rm backend/config.db
```

### ❌ Module not found errors
```bash
# Clear node_modules and reinstall:
# Backend:
cd backend
rm -r node_modules  # or rmdir /s /q node_modules on Windows
npm install

# Frontend:
cd frontend
rm -r node_modules  # or rmdir /s /q node_modules on Windows
npm install
```

---

## Features

✅ **Dynamic Status Management** - Create, read, and delete statuses  
✅ **Workflow Transitions** - Define allowed transitions between statuses  
✅ **Initial Status** - Set and manage the initial workflow status  
✅ **SQLite Database** - Persistent data storage  
✅ **React Frontend** - Modern UI with Vite  
✅ **Express Backend** - RESTful API with TypeScript  
✅ **Real-time Updates** - Live synchronization between frontend and backend  

---

## Tech Stack

**Frontend:**
- React 19
- Vite
- TypeScript
- Axios (HTTP client)
- Lucide React (Icons)

**Backend:**
- Node.js
- Express.js
- TypeScript
- SQLite3 / better-sqlite3
- CORS middleware

---

## FAQ

**Q: How is my data saved?**  
A: All data is automatically persisted in the SQLite database (`backend/config.db`). The database is created on first run.

**Q: How do I add a new status?**  
A: Use the "Add Status" form in the Status Panel (right side of the UI).

**Q: Can I change the API port?**  
A: Yes, set the `PORT` environment variable in `backend/.env` or modify the code directly.

**Q: How do I reset all data?**  
A: You can use the reset endpoint via the API or delete the `config.db` file and restart the backend.

**Q: Can I run this on a different machine?**  
A: Yes, update the `VITE_API_URL` in `frontend/.env` to point to your backend server's address.

---

## Development Notes

- Backend runs on **port 5000** by default
- Frontend runs on **port 5173** by default (Vite dev server)
- All data is stored in SQLite at `backend/config.db`
- Make sure both processes are running for the app to work correctly

---

## Support

For more details, check the README files in the `frontend/` and `backend/` directories.
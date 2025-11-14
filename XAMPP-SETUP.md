## 🚀 Quick Start with XAMPP

### ✨ New: Automatic Database Setup!
The database and tables are now created **automatically** when you start the backend. No manual SQL needed!

### Prerequisites
- ✅ XAMPP installed (with MySQL)
- ✅ Node.js installed
- ✅ npm dependencies installed (`npm install` in root and `server` folder)

### Setup Steps

**1. Start XAMPP MySQL**
- Open XAMPP Control Panel
- Click "Start" for MySQL

**2. Configure Environment**
```bash
1-configure.bat
```
This will open `server\.env` for editing. Update:
- `DB_PASSWORD=` (leave empty for default XAMPP)
- `SMTP_USER=` (your Gmail)
- `SMTP_PASSWORD=` (Gmail App Password)
- `ADMIN_PASSWORD=` (your admin password)

**3. Start Project**
```bash
2-start-project.bat
```
**That's it!** The database and tables will be created automatically on first run.

### Access URLs
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

### Default Admin Login
- **Email**: admin@1000coupole.com
- **Password**: Check `ADMIN_PASSWORD` in `server\.env`

### Troubleshooting

**Database Connection Error?**
- Make sure XAMPP MySQL is running
- Check `DB_PASSWORD` in `server\.env` (should be empty for default XAMPP)

**Port 8080 Already in Use?**
- Frontend is already running from previous `npm run dev`
- That's fine! Just access http://localhost:8080

**Backend Won't Start?**
- Check if port 5000 is free
- Make sure `server\node_modules` exists (run `cd server && npm install`)

### Project Structure
```
algiers-export-hub-main/
├── src/              # Frontend (React + Vite)
├── server/           # Backend (Express + MySQL)
├── 1-configure.bat   # Configure environment variables
└── 2-start-project.bat  # Start the project
```

### How It Works
- **Automatic Database Setup**: The backend automatically creates the database and tables on first run
- **No Manual SQL**: No need to run SQL scripts manually
- **Auto-Seeding**: Admin user and certifications are added automatically

# Deployment Guide for cPanel Shared Hosting

## Prerequisites
- cPanel with Node.js support (version 18 or higher)
- SSH access (optional but recommended)
- MySQL database access
- Domain/subdomain configured

## Method 1: cPanel with Node.js (Most Common)

### 1. Build Your React Frontend

On your local machine:
```bash
npm run build
```

This creates a `dist` folder with your production React app.

### 2. Set Up Database on cPanel

1. Log into cPanel
2. Go to **MySQL Databases**
3. Create a new database (e.g., `username_algiers`)
4. Create a database user
5. Add user to database with all privileges
6. Note down:
   - Database name
   - Database user
   - Database password
   - Host (usually `localhost`)

### 3. Import Database Schema

1. Go to **phpMyAdmin** in cPanel
2. Select your database
3. Click **Import**
4. Upload `server/src/db/schema.sql`
5. Execute the import

### 4. Upload Backend Files

Using **File Manager** or **FTP**:
```
/home/username/
  ├── public_html/           (Frontend files go here)
  ├── backend/               (Create this folder for backend)
      ├── src/
      ├── package.json
      ├── tsconfig.json
      └── .env
```

Upload the `server` folder contents to `backend`.

### 5. Configure Environment Variables

Create `backend/.env`:
```env
NODE_ENV=production
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# JWT
JWT_SECRET=your-super-secret-key-change-this-in-production

# Admin credentials
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=YourSecurePassword123

# CORS
CORS_ORIGIN=https://yourdomain.com

# File upload path
UPLOAD_PATH=/home/username/public_html/uploads
```

### 6. Set Up Node.js Application in cPanel

1. Go to **Setup Node.js App** in cPanel
2. Click **Create Application**
3. Configure:
   - **Node.js version**: 18.x or higher
   - **Application mode**: Production
   - **Application root**: `backend`
   - **Application URL**: Choose subdomain or path (e.g., `api.yourdomain.com`)
   - **Application startup file**: `src/index.js`
   - **Environment variables**: Add from .env

4. Click **Create**

### 7. Install Dependencies

In cPanel Terminal or SSH:
```bash
cd ~/backend
npm install
```

### 8. Build Backend TypeScript

```bash
cd ~/backend
npm run build  # If you have a build script
```

Or use `ts-node` in production (less ideal):
Update `package.json`:
```json
{
  "scripts": {
    "start": "node --loader ts-node/esm src/index.ts"
  }
}
```

### 9. Upload Frontend Files

1. Upload contents of `dist` folder to `public_html`
2. Your structure should be:
```
public_html/
  ├── index.html
  ├── assets/
  ├── hero-image.png
  ├── logo.png
  └── uploads/  (create this folder, chmod 755)
```

### 10. Configure API URL

Update frontend environment:
Create `public_html/.env.production`:
```
VITE_API_URL=https://api.yourdomain.com/api
```

Rebuild frontend with production API URL:
```bash
# On local machine
VITE_API_URL=https://api.yourdomain.com/api npm run build
```
Then re-upload `dist` contents.

### 11. Set Up .htaccess for React Routing

Create `public_html/.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Enable CORS for uploads
<FilesMatch "\.(jpg|jpeg|png|gif|webp)$">
  Header set Access-Control-Allow-Origin "*"
</FilesMatch>
```

### 12. Start Backend Application

In cPanel Node.js App interface:
- Click **Start** button
- Verify it's running
- Check application URL works

### 13. Run Database Seed

SSH or Terminal:
```bash
cd ~/backend
node --loader ts-node/esm src/db/seed.ts
```

---

## Method 2: Alternative - API on Different Host

If your cPanel doesn't support Node.js well:

### Host Backend on:
- **Railway.app** (Free tier available)
- **Render.com** (Free tier)
- **Heroku** (Paid)
- **DigitalOcean App Platform**

### Host Frontend on cPanel:
- Just upload `dist` folder to `public_html`
- Point VITE_API_URL to external API

---

## Post-Deployment Checklist

✅ Database is created and schema imported
✅ Backend is running and accessible
✅ Frontend can reach backend API
✅ File uploads work (check folder permissions)
✅ Admin login works
✅ Products display with images
✅ Contact form sends emails (configure SMTP)

---

## Troubleshooting

### Backend won't start:
- Check Node.js version (need 18+)
- Check error logs in cPanel
- Verify all dependencies installed
- Check .env file configuration

### Images not displaying:
- Check uploads folder permissions (755)
- Verify CORS headers
- Check image paths in database

### API connection fails:
- Verify CORS_ORIGIN in backend .env
- Check API URL in frontend
- Ensure backend is running

### Database connection fails:
- Verify database credentials
- Check if user has privileges
- Ensure database exists

---

## Performance Tips

1. **Enable Gzip compression** in .htaccess:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

2. **Enable browser caching**:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

3. **Use CDN** for static assets if needed

---

## Security Recommendations

1. Change default admin password immediately
2. Use strong JWT_SECRET (generate random string)
3. Keep Node.js and packages updated
4. Set up SSL certificate (Let's Encrypt in cPanel)
5. Restrict database access
6. Set proper file permissions (644 for files, 755 for folders)

---

## Need Help?

Common hosting providers with good Node.js support:
- A2 Hosting
- HostGator (with Node.js addon)
- Hostinger (Business/Cloud plans)
- SiteGround (Cloud hosting)

If your current host doesn't support Node.js, consider:
1. Upgrade to VPS/Cloud hosting, or
2. Use hybrid approach (frontend on cPanel, backend elsewhere)

# 🚀 Quick Start Guide - InstallPro

## First Time Setup

### 1. Install Dependencies

**Backend:**
```powershell
cd "F:\Web Development\Installment Management System\backend"
npm install
```

**Frontend:**
```powershell
cd "F:\Web Development\Installment Management System\frontend"
npm install
```

## Running the Application

### Method 1: Using Two Terminals (Recommended for Development)

**Terminal 1 - Start Backend Server:**
```powershell
cd "F:\Web Development\Installment Management System\backend"
npm start
# OR for auto-reload on changes:
npm run dev
```

**Terminal 2 - Start Electron Desktop App:**
```powershell
cd "F:\Web Development\Installment Management System\frontend"
npm run electron
```

### Method 2: Browser Only (For Testing)

**Terminal 1 - Backend:**
```powershell
cd "F:\Web Development\Installment Management System\backend"
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd "F:\Web Development\Installment Management System\frontend"
npm run dev
```
Then open http://localhost:5173 in your browser.

## Verification Checklist

✅ Backend is running on http://localhost:5000
✅ You see "Server is running on port 5000" message
✅ Frontend/Electron app opens automatically
✅ Sidebar navigation is visible
✅ Dashboard loads with statistics

## Troubleshooting

### Port 5000 Already in Use
```powershell
# Find and kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Port 5173 Already in Use
```powershell
# Find and kill process using port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Backend Connection Error
1. Ensure backend is running first
2. Check http://localhost:5000 in browser - should show "Installment Management Backend Running"
3. Verify no firewall is blocking the port

### Electron App Shows Blank Screen
1. Wait a few seconds - frontend is loading
2. Check if Vite dev server started (should see "VITE v7.x.x ready" message)
3. Press Ctrl+R to reload

## Default Credentials

No authentication is currently set up. The app is ready to use immediately.

## First Steps

1. **Add Customers**: Click "Customers" → "Add Customer"
2. **Add Products**: Click "Products" → "Add Product"
3. **Create Installments**: Go to a customer's dashboard and add installments
4. **View Reports**: Click "Reports" to generate payment reports

## Development Tools

- Backend logs appear in Terminal 1
- Frontend/Electron DevTools: Press F12 in the app
- Hot reload is enabled - save files to see changes

## Need Help?

- Check PROJECT_README.md for detailed documentation
- Review API endpoints in the README
- Check browser/DevTools console for errors

---

**Ready to go! Start managing installments like a pro! 🎉**

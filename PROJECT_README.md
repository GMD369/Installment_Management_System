# InstallPro - Installment Management System

A professional desktop application for managing customer installments, products, and payments. Built with React, Electron, and Node.js/Express.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Features

### Core Functionality
- **Customer Management**: Add, edit, view, and delete customers with complete profile information
- **Product Catalog**: Manage products with pricing, models, and installment plans
- **Installment Tracking**: Track all installments with due dates, payment status, and history
- **Customer Dashboard**: Detailed view of each customer with products and payment history
- **Reports & Analytics**: Generate daily, weekly, monthly, and custom date range reports
- **Professional UI**: Modern, clean interface optimized for desktop use

### Technical Features
- ✅ Electron desktop application
- ✅ RESTful API backend
- ✅ SQLite database
- ✅ File upload support for customer documents
- ✅ Responsive design with Tailwind CSS
- ✅ Professional navigation with sidebar
- ✅ Real-time data updates

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Installment Management System"
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## 🚦 Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd backend
node src/app.js
```
The backend will start on `http://localhost:5000`

**Terminal 2 - Frontend (Electron App):**
```bash
cd frontend
npm run electron
```

### Option 2: Development Mode

**Start Backend:**
```bash
cd backend
node src/app.js
```

**Start Frontend (Browser):**
```bash
cd frontend
npm run dev
```
Then open `http://localhost:5173` in your browser.

## 📁 Project Structure

```
Installment Management System/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Main server file
│   │   ├── config/
│   │   │   └── db.js              # Database configuration
│   │   ├── controllers/           # Business logic
│   │   │   ├── customerController.js
│   │   │   ├── productController.js
│   │   │   ├── installmentController.js
│   │   │   ├── reportController.js
│   │   │   └── customerDashboardController.js
│   │   ├── models/                # Database models
│   │   │   ├── customerModel.js
│   │   │   ├── productModel.js
│   │   │   └── installmentModel.js
│   │   ├── routes/                # API routes
│   │   │   ├── customerRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── installmentRoutes.js
│   │   │   ├── reportRoutes.js
│   │   │   └── customerDashboardRoutes.js
│   │   ├── utils/
│   │   │   └── upload.js          # File upload utility
│   │   └── uploads/               # Uploaded files
│   ├── database/                  # SQLite database
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/                   # API client functions
    │   │   ├── axiosClient.js
    │   │   ├── customers.js
    │   │   ├── products.js
    │   │   ├── installments.js
    │   │   ├── reports.js
    │   │   └── dashboard.js
    │   ├── components/            # React components
    │   │   ├── Layout/
    │   │   │   ├── Sidebar.jsx
    │   │   │   └── Header.jsx
    │   │   ├── customers/
    │   │   │   ├── CustomerList.jsx
    │   │   │   ├── AddCustomer.jsx
    │   │   │   ├── EditCustomer.jsx
    │   │   │   └── CustomerDetailsModal.jsx
    │   │   ├── products/
    │   │   │   ├── ProductList.jsx
    │   │   │   ├── AddProduct.jsx
    │   │   │   ├── EditProduct.jsx
    │   │   │   └── ProductDetailsModal.jsx
    │   │   └── installments/
    │   │       ├── InstallmentList.jsx
    │   │       ├── AddInstallment.jsx
    │   │       └── EditInstallment.jsx
    │   ├── pages/                 # Page components
    │   │   ├── Dashboard.jsx
    │   │   ├── Customers.jsx
    │   │   ├── Products.jsx
    │   │   ├── Installments.jsx
    │   │   ├── Reports.jsx
    │   │   └── CustomerDashboard.jsx
    │   ├── App.jsx                # Main app component
    │   ├── main.jsx               # Entry point
    │   └── index.css              # Global styles
    ├── electron.js                # Electron main process
    ├── preload.js                 # Electron preload script
    └── package.json
```

## 🔌 API Endpoints

### Customers
- `GET /api/customers/all` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers/add` - Add new customer
- `PUT /api/customers/update/:id` - Update customer
- `DELETE /api/customers/delete/:id` - Delete customer

### Products
- `GET /api/products/all` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products/add` - Add new product
- `PUT /api/products/update/:id` - Update product
- `DELETE /api/products/delete/:id` - Delete product

### Installments
- `POST /api/installments/add` - Add new installment
- `GET /api/installments/customer/:customer_id` - Get customer installments
- `PUT /api/installments/pay/:id` - Mark installment as paid
- `PUT /api/installments/update/:id` - Update installment
- `DELETE /api/installments/delete/:id` - Delete installment

### Reports
- `GET /api/reports/daily?date=YYYY-MM-DD` - Daily report
- `GET /api/reports/weekly?start=YYYY-MM-DD&end=YYYY-MM-DD` - Weekly report
- `GET /api/reports/monthly?month=YYYY-MM` - Monthly report
- `GET /api/reports/custom?start=YYYY-MM-DD&end=YYYY-MM-DD` - Custom range

### Dashboard
- `GET /api/dashboard/:customer_id` - Customer dashboard with full details

## 🎨 Features in Detail

### Dashboard
- Overview statistics (customers, products, revenue)
- Recent customer list
- Payment status overview
- Quick action buttons

### Customer Management
- Complete customer profiles with CNIC and address
- Reference contact information
- Document upload support
- Individual customer dashboard with payment history

### Product Catalog
- Product details with model and pricing
- Sale price and down payment tracking
- Installment duration configuration
- Notes and additional information

### Installment Tracking
- Status tracking (Paid/Pending)
- Due date management
- Payment history
- Customer-wise installment view

### Reports & Analytics
- Daily payment reports
- Weekly summaries
- Monthly overviews
- Custom date range reports
- CSV export functionality

## 🔧 Configuration

### Backend Configuration
Edit `backend/src/app.js` to change:
- Port number (default: 5000)
- CORS settings
- Database path

### Frontend Configuration
Edit `frontend/src/api/axiosClient.js` to change:
- API base URL (default: http://localhost:5000/api)
- Request timeout
- Interceptors

### Electron Configuration
Edit `frontend/electron.js` to change:
- Window dimensions
- Development/Production settings
- App menu

## 📦 Building for Production

### Build Frontend
```bash
cd frontend
npm run build
```

### Package Electron App
```bash
cd frontend
npm install electron-builder --save-dev
```

Add to `package.json`:
```json
"build": {
  "appId": "com.installpro.app",
  "productName": "InstallPro",
  "directories": {
    "output": "release"
  },
  "files": [
    "dist/**/*",
    "electron.js",
    "preload.js"
  ]
}
```

Then run:
```bash
npm run build
npx electron-builder
```

## 🛡️ Security Considerations

- Customer documents are stored locally in `backend/src/uploads/`
- Database file is stored in `backend/database/`
- No authentication is currently implemented (add if deploying publicly)
- CORS is enabled for local development

## 🐛 Troubleshooting

### Backend not starting
- Ensure port 5000 is not in use
- Check SQLite3 installation
- Verify Node.js version

### Frontend not connecting to backend
- Verify backend is running on port 5000
- Check API base URL in `axiosClient.js`
- Inspect browser console for errors

### Electron app not opening
- Ensure Vite dev server is running
- Check electron.js configuration
- Verify port 5173 is not blocked

## 📝 License

This project is licensed under the MIT License.

## 👥 Support

For support and questions, please contact the development team.

## 🔄 Version History

### Version 1.0.0 (Current)
- Initial release
- Core customer, product, and installment management
- Dashboard and reports functionality
- Electron desktop application

---

**Built with ❤️ for efficient installment management**

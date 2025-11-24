const express =require('express');
const cors =require('cors');
const path =require('path');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const installmentRoutes = require('./routes/installmentRoutes');
const customerDashboardRoutes = require('./routes/customerDashboardRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Connect Database
require('./config/db');

const app=express();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads",express.static(path.join(__dirname,'uploads')));

//routes
app.get('/',(req,res)=>{
    res.send('Installment Management Backend Running');
})


app.use('/api/reports', reportRoutes);
app.use('/api/dashboard', customerDashboardRoutes);
app.use('/api/installments', installmentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
const express =require('express');
const cors =require('cors');
const path =require('path');
const customerRoutes = require('./routes/customerRoutes');

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

app.use('/api/customers', customerRoutes);

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
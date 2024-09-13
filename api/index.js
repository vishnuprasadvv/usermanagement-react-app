import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'
import adminRoutes from './routes/adminRoutes.js'


import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to mongodb successfully")
}).catch((err)=>{
    console.log(err);
})
 
const app = express();


// Get the full path of the current file
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current file
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))



app.use(express.json())


app.listen(3000, ()=>{
    console.log('api running on port 3000')
});

//routes 
app.use('/api/user' , userRoutes) 
app.use('/api/auth' , authRoutes)
app.use('/api/admin', adminRoutes)

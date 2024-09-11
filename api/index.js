import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to mongodb successfully")
}).catch((err)=>{
    console.log(err);
})
 
const app = express();

app.listen(3000, ()=>{
    console.log('api running on port 3000')
});
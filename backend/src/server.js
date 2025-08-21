import express from 'express';
// never forget to add .js in the end of import path for files in nodejs
// this is because nodejs does not support import without .js in the end of path
import { ENV } from './config/env.js';

import { connectDB } from './config/db.js';

import { clerkMiddleware } from "@clerk/express";


const app = express();

app.get('/', (req, res) => {
    res.send("hello slack");
})
app.listen(ENV.PORT,()=>{
    console.log(`server is up and running on port ${ENV.PORT}`);
    connectDB();
    
})
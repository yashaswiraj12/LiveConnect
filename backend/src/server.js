import express from 'express';
// never forget to add .js in the end of import path for files in nodejs
// this is because nodejs does not support import without .js in the end of path
import { ENV } from './config/env.js';

import { connectDB } from './config/db.js';

import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from './config/inngest.js';
import { serve } from "inngest/express";


const app = express();
app.use(express.json());
app.use(clerkMiddleware());
// request.auth will be available in request object 

app.use("/api/inngest", serve({ client: inngest, functions }));
app.get('/', (req, res) => {
    res.send("hello slack");
})
const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Server started on port:", ENV.PORT);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();
export default app;
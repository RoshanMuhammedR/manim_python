import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser"; 
import useAuth from './routes/auth.route.js'
import useProj from './routes/project.route.js'
import cors from "cors";
import { connectDB } from './lib/db.js'

configDotenv();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

app.use('/api/auth',useAuth);
app.use('/api/project',useProj);

app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})
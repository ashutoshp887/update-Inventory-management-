import express from 'express';
import dotenv from 'dotenv';
import ConnectDb from './DataBase/Dataconfig.js';
import itemRouter from './Router/ItemRouter.js';
import cors from 'cors';
import userRouter from './Router/UserRoute.js';
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const _dirname = path.resolve();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true // ✅ allow cookies / credentials
}));
app.use(express.json());
app.use(cookieParser()); // 👈 Ye line important hai
app.use('/api', itemRouter);
app.use('/api',userRouter);
app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get(/.*/,(req,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})
app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

ConnectDb(); 
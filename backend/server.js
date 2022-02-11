import express from 'express';
import mongoose from 'mongoose';
import { projectRoutes } from './routes/projectRoutes.js';
import { listRoutes } from './routes/listRoutes.js';
import { itemRoutes } from './routes/itemRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors({
  origin: ["https://matanweiss.github.io", "http://localhost:3000"],
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT || process.env.DEV_PORT, () => console.log('server is running')))
  .catch(err => console.error(err.message));

app.use(projectRoutes);
app.use(listRoutes);
app.use(itemRoutes);
app.use(authRoutes);
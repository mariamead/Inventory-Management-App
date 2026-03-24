import express, { Express } from 'express';
import profileRoutes from "./api/v1/routes/profileRoutes";

const app: Express = express();

app.use(express.json());
app.use('/api/user-profile', profileRoutes);

export default app;
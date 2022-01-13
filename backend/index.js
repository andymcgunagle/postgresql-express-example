import express from 'express';
import router from './routers/router.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => console.log(`We're live on http://localhost:${PORT}/`));
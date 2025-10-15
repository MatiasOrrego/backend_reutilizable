import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { notFound, errorHandler } from './middleware/errorHandler';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/health', (_req, res) => res.json({ ok: true, uptime: process.uptime() }));
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);
export default app;

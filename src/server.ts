import './loadEnvironment.js';
import express from 'express';
import apiRouter from './api/routers/apiRouter';

// Initialize express
const app = express();
const port = process.env.HOST_PORT ?? '3000';

app.get('/ping', (req, res) => res.send('pong'));

// API Router
app.use('/api', apiRouter);

app.listen(process.env.HOST_PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;

import express from 'express';
import connectDB from "./configs/db.js";
import { envVar } from "./configs/env.vars.js";
import { logError } from "./utils/index.js";
import logger from "./configs/wins.logger.js";
import eventRoutes from './routes/v1/event.route.js';
import profileRoutes from './routes/v1/profile.route.js'; // ✅ Add this
import dotenv from 'dotenv';

connectDB();

const app = express();
app.use(express.json());

// ✅ ROUTES
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/profile', profileRoutes); // ✅ Correctly mounted

const server = app.listen(envVar.port, async () => {
  const url = `${envVar.serverUrl}:${envVar.port}`;
  logger.infoLogger.info(`Server running at ${url}`);
  await connectDB();
});

// ✅ ERROR HANDLING
const handleUncaughtException = (error) => {
  logError(error);
  server?.close(() => process.exit(1));
};

process.on('uncaughtException', handleUncaughtException);
process.on('unhandledRejection', handleUncaughtException);
process.on('SIGTERM', () => {
  logger.infoLogger.info('SIGTERM received');
  server?.close();
});

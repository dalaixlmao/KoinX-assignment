import express, { Express } from 'express';
import mongoose from 'mongoose';
import CryptoController from './controllers/cryptoController';
import BackgroundJob from './jobs/backgroundJob';
import errorHandler from './utils/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

class App {
  private express: Express;
  private cryptoController: CryptoController;
  private backgroundJob: BackgroundJob;

  constructor() {
    this.express = express();
    this.cryptoController = new CryptoController();
    this.backgroundJob = new BackgroundJob();
  }

  public async initialize(): Promise<void> {
    await this.connectToDatabase();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandler();
    this.startBackgroundJob();  // Explicitly start the background job
  }

  private async connectToDatabase(): Promise<void> {
    const uri = process.env.MONGODB_URL;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  }

  private setupMiddleware(): void {
    this.express.use(express.json());
  }

  private setupRoutes(): void {
    this.express.get('/stats', this.cryptoController.getStats);
    this.express.get('/deviation', this.cryptoController.getDeviation);
  }

  private setupErrorHandler(): void {
    this.express.use(errorHandler);
  }

  private startBackgroundJob(): void {
    this.backgroundJob.start();
    console.log('Background job started');
  }

  public startServer(): void {
    const port = process.env.PORT || 3000;
    this.express.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

const app = new App();
app.initialize().then(() => app.startServer());

export default app;
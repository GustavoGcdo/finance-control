import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import 'reflect-metadata';
import config from './config';
import DIContainer from './di-container';
import { InfoRoutes } from './presentation/routes/info.route';

export class App {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public async create() {
    this.configureMiddleWares();
    this.configureRoutes();
    await this.connectToDatabase();
    return this.app;
  }

  private configureMiddleWares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private configureRoutes() {
    const indexRoutes = DIContainer.resolve<InfoRoutes>(InfoRoutes);
    this.app.use(indexRoutes.getRoutes());
  }

  private async connectToDatabase() {
    return mongoose.connect(config.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public start() {
    this.app.listen(config.PORT, () => {
      console.log(`listen on port ${config.PORT}`);
    });
  }

  public getApplication() {
    return this.app;
  }

  public async disconnect() {
    await mongoose.disconnect();
  }
}
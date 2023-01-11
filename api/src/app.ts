import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import config from './config';
import { makeFinanceRoutes } from './infra/factories/finance-routes.factory';
import { makeInfoRoutes } from './infra/factories/info-routes.factory';
import { makeLoginRoutes } from './infra/factories/login-routes.factory';

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
    this.app.use(makeInfoRoutes().getRoutes());
    this.app.use(makeLoginRoutes().getRoutes());
    this.app.use(makeFinanceRoutes().getRoutes());
  }

  private async connectToDatabase() {
    return mongoose.connect(config.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log('[app] > database conected');
    });
  }

  public start() {
    this.app.listen(config.PORT, () => {
      console.log(`[app] > listen on port ${config.PORT}`);
    });
  }

  public getApplication() {
    return this.app;
  }

  public getConnection() {
    return mongoose.connection;
  }

  public async disconnect() {
    await mongoose.disconnect();
  }
}

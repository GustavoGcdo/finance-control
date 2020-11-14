import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import 'reflect-metadata';
import config from './config';
import DIContainer from './di-container';
import { FinanceRoutes } from './presentation/routes/finance.routes';
import { InfoRoutes } from './presentation/routes/info.routes';
import { LoginRoutes } from './presentation/routes/login.routes';

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
    const loginRoutes = DIContainer.resolve<LoginRoutes>(LoginRoutes);
    const finaceRoutes = DIContainer.resolve<FinanceRoutes>(FinanceRoutes);

    this.app.use(indexRoutes.getRoutes());
    this.app.use(loginRoutes.getRoutes());
    this.app.use(finaceRoutes.getRoutes());
  }

  private async connectToDatabase() {
    return mongoose.connect(config.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
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

  public getConnection() {
    return mongoose.connection;
  }

  public async disconnect() {
    await mongoose.disconnect();
  }
}

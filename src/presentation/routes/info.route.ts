import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { InfoController } from '../controllers/info.controller';

@injectable()
export class InfoRoutes {
  private router: Router;
  private _controller: InfoController;

  constructor(@inject(InfoController) controller: InfoController) {
    this.router = Router();
    this._controller = controller;
  }

  getRoutes() {
    this.mapRoutes();
    return this.router;
  }

  private mapRoutes() {
    this.router.get('/', (req, res) => this._controller.getApiInfo(req, res));
  }
}

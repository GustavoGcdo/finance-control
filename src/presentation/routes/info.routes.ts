import { Router } from 'express';
import { InfoController } from '../controllers/info.controller';

export class InfoRoutes {
  private router: Router;
  private _controller: InfoController;

  constructor(controller: InfoController) {
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

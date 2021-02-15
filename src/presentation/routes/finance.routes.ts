import { Router } from 'express';
import { FinanceController } from '../controllers/finance.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class FinanceRoutes {
  private router: Router;
  private _controller: FinanceController;
  private _auth: AuthMiddleware;

  constructor(
    auth: AuthMiddleware,
    controller: FinanceController) {
    this.router = Router();
    this._controller = controller;
    this._auth = auth;
  }

  getRoutes() {
    this.mapRoutes();
    return this.router;
  }

  private mapRoutes() {
    this.router.get('/finance/extract',
      (req, res, next) => this._auth.authorize(req, res, next),
      (req, res) => this._controller.getUserExtract(req, res));

    this.router.get('/finance/operations',
      (req, res, next) => this._auth.authorize(req, res, next),
      (req, res) => this._controller.getUserOperations(req, res));

    this.router.post('/finance/operations',
      (req, res, next) => this._auth.authorize(req, res, next),
      (req, res) => this._controller.addOperation(req, res));
  }
}

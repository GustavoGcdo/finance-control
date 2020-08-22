import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { FinanceController } from '../controllers/finance.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@injectable()
export class FinanceRoutes {
  private router: Router;
  private _controller: FinanceController;
  private _auth: AuthMiddleware;

  constructor(
    @inject(AuthMiddleware) auth: AuthMiddleware,
    @inject(FinanceController) controller: FinanceController) {
    this.router = Router();
    this._controller = controller;
    this._auth = auth;
  }

  getRoutes() {
    this.mapRoutes();
    return this.router;
  }

  private mapRoutes() {
    this.router.get('/finance/operations',
      (req, res, next) => this._auth.authorize(req, res, next),
      (req, res) => this._controller.getUserOperations(req, res));
    
      this.router.post('/finance/operations',
      (req, res, next) => this._auth.authorize(req, res, next),
      (req, res) => this._controller.addOperation(req, res));
  }
}

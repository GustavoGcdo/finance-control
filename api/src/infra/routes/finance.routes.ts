import { Router } from 'express';
import { FinanceController } from '../controllers/finance.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class FinanceRoutes {
  private router: Router;
  private controller: FinanceController;
  private auth: AuthMiddleware;

  constructor(
    auth: AuthMiddleware,
    controller: FinanceController) {
    this.router = Router();
    this.controller = controller;
    this.auth = auth;
  }

  getRoutes() {
    this.mapRoutes();
    return this.router;
  }

  private mapRoutes() {
    this.router.get('/finance/extract',
      (req, res, next) => this.auth.authorize(req, res, next),
      (req, res) => this.controller.getUserExtract(req, res));

    this.router.get('/finance/operations',
      (req, res, next) => this.auth.authorize(req, res, next),
      (req, res) => this.controller.getUserOperations(req, res));

    this.router.post('/finance/operations',
      (req, res, next) => this.auth.authorize(req, res, next),
      (req, res) => this.controller.addOperation(req, res));

    this.router.put('/finance/operations/:id',
      (req, res, next) => this.auth.authorize(req, res, next),
      (req, res) => this.controller.updateOperation(req, res));
    
      this.router.delete('/finance/operations/:id',
      (req, res, next) => this.auth.authorize(req, res, next),
      (req, res) => this.controller.deleteOperation(req, res));
  }
}

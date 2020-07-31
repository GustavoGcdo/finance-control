import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { FinanceController } from '../controllers/finance.controller';

@injectable()
export class FinanceRoutes {
  private router: Router;
  private _controller: FinanceController;

  constructor(@inject(FinanceController) controller: FinanceController) {
    this.router = Router();
    this._controller = controller;
  }

  getRoutes() {
    this.mapRoutes();
    return this.router;
  }

  private mapRoutes() {
    this.router.post('/finance/recipes', (req, res) => this._controller.addRecipe(req, res));
  }
}

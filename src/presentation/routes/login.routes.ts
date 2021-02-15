import { Router } from 'express';
import { LoginController } from '../controllers/login.controller';

export class LoginRoutes {
  private router: Router;
  private _controller: LoginController;

  constructor(controller: LoginController) {
    this.router = Router();
    this._controller = controller;
  }

  getRoutes() {
    this.mapRoutes();
    return this.router;
  }

  private mapRoutes() {
    this.router.post('/signup', (req, res) => this._controller.signup(req, res));
    this.router.post('/login', (req, res) => this._controller.login(req, res));
  }
}

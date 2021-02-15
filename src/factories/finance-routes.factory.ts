import { GetUserExtractHandler } from '../modules/extract/handlers/get-user-extract.handler';
import { AddOperationHandler } from '../modules/operations/handlers/add-operation.handler';
import { GetUserOperationsHandler } from '../modules/operations/handlers/get-user-operations.handler';
import { OperationRepository } from '../modules/operations/repositories/operation.repository';
import { AuthService } from '../modules/shared/services/auth.service';
import { UserRepository } from '../modules/users/repositories/user.repository';
import { FinanceController } from '../presentation/controllers/finance.controller';
import { AuthMiddleware } from '../presentation/middlewares/auth.middleware';
import { FinanceRoutes } from '../presentation/routes/finance.routes';

export const makeFinanceRoutes = (): FinanceRoutes => {
  const authService = new AuthService();
  const authMiddleware = new AuthMiddleware(authService);
  const operationsRepository = new OperationRepository();
  const userRepository = new UserRepository();
  const getOperationsHandler = new GetUserOperationsHandler(operationsRepository, userRepository);
  const getUserExtractHandler = new GetUserExtractHandler(operationsRepository, userRepository);
  const addOperationHandler = new AddOperationHandler(userRepository, operationsRepository);
  const financeController = new FinanceController(getOperationsHandler, getUserExtractHandler, addOperationHandler, authService);
  const financeRoutes = new FinanceRoutes(authMiddleware, financeController);
  return financeRoutes;
};

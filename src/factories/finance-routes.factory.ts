import { GetSimpleUserExtract } from '../modules/extract/useCases/get-simple-user-extract';
import { OperationRepository } from '../modules/operations/repositories/operation.repository';
import { AddOperationToUser } from '../modules/operations/useCases/add-operation';
import { GetUserOperations } from '../modules/operations/useCases/get-user-operations';
import { UpdateOperationHandler } from '../modules/operations/useCases/update-operation.handler';
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
  const getOperations = new GetUserOperations(operationsRepository, userRepository);
  const getUserExtract = new GetSimpleUserExtract(operationsRepository, userRepository);
  const addOperation = new AddOperationToUser(userRepository, operationsRepository);
  const updateOperation = new UpdateOperationHandler(userRepository, operationsRepository);
  const financeController = new FinanceController(getOperations, getUserExtract, addOperation, updateOperation, authService);
  const financeRoutes = new FinanceRoutes(authMiddleware, financeController);
  return financeRoutes;
};

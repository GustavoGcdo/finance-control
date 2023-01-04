import { AddOperationToUser } from '../../application/useCases/addOperation/add-operation';
import { GetSimpleUserExtract } from '../../application/useCases/getUserExtract/get-simple-user-extract';
import { GetUserOperations } from '../../application/useCases/getUserOperations/get-user-operations';
import { UpdateOperationHandler } from '../../application/useCases/updateOperation/update-operation.handler';
import { FinanceController } from '../controllers/finance.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { OperationRepository } from '../repositories/operation.repository';
import { UserRepository } from '../repositories/user.repository';
import { FinanceRoutes } from '../routes/finance.routes';
import { AuthService } from '../services/auth.service';


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

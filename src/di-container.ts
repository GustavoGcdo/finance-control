import { Container } from 'inversify';
import { IGetUserExtractHandler } from './modules/extract/handlers/get-user-extract-handler.interface';
import { GetUserExtractHandler } from './modules/extract/handlers/get-user-extract.handler';
import ExtractTypes from './modules/extract/types/extract.types';
import { IInfoService } from './modules/info/services/info-service.interface';
import { InfoService } from './modules/info/services/info.service';
import InfoTypes from './modules/info/types/info.types';
import { ILoginHandler } from './modules/login/handlers/login-handler.interface';
import { LoginHandler } from './modules/login/handlers/login.handler';
import { ISignupHandler } from './modules/login/handlers/signup-handler.interface';
import { SignupHandler } from './modules/login/handlers/signup.handler';
import LoginTypes from './modules/login/types/login.types';
import { IAddOperationHandler } from './modules/operations/handlers/add-operation-handler.interface';
import { AddOperationHandler } from './modules/operations/handlers/add-operation.handler';
import { IGetUserOperationsHandler } from './modules/operations/handlers/get-user-operations-handler.interface';
import { GetUserOperationsHandler } from './modules/operations/handlers/get-user-operations.handler';
import { IOperationRepository } from './modules/operations/repositories/operation-repository.interface';
import { OperationRepository } from './modules/operations/repositories/operation.repository';
import OperationTypes from './modules/operations/types/operation.types';
import { IAuthService } from './modules/shared/services/auth-service.interface';
import { AuthService } from './modules/shared/services/auth.service';
import { IEncriptService } from './modules/shared/services/encript-service.interface';
import { EncriptService } from './modules/shared/services/encript.service';
import SharedTypes from './modules/shared/types/shared.types';
import { IUserRepository } from './modules/users/repositories/user-repository.interface';
import { UserRepository } from './modules/users/repositories/user.repository';
import UserTypes from './modules/users/types/user.types';
import { FinanceController } from './presentation/controllers/finance.controller';
import { InfoController } from './presentation/controllers/info.controller';
import { LoginController } from './presentation/controllers/login.controller';
import { AuthMiddleware } from './presentation/middlewares/auth.middleware';
import { FinanceRoutes } from './presentation/routes/finance.routes';
import { InfoRoutes } from './presentation/routes/info.routes';
import { LoginRoutes } from './presentation/routes/login.routes';

const DIContainer = new Container();

// routes
DIContainer.bind<InfoRoutes>(InfoRoutes).toSelf();
DIContainer.bind<LoginRoutes>(LoginRoutes).toSelf();
DIContainer.bind<FinanceRoutes>(FinanceRoutes).toSelf();

// middlewares
DIContainer.bind<AuthMiddleware>(AuthMiddleware).toSelf();

// controllers
DIContainer.bind<InfoController>(InfoController).toSelf();
DIContainer.bind<LoginController>(LoginController).toSelf();
DIContainer.bind<FinanceController>(FinanceController).toSelf();

// services
DIContainer.bind<IInfoService>(InfoTypes.InfoService).to(InfoService);
DIContainer.bind<IEncriptService>(SharedTypes.EncriptService).to(EncriptService);
DIContainer.bind<IAuthService>(SharedTypes.AuthService).to(AuthService);

// handlers
DIContainer.bind<ISignupHandler>(LoginTypes.SignupHandler).to(SignupHandler);
DIContainer.bind<ILoginHandler>(LoginTypes.LoginHandler).to(LoginHandler);
DIContainer.bind<IAddOperationHandler>(OperationTypes.AddOperationHandler).to(AddOperationHandler);
DIContainer.bind<IGetUserOperationsHandler>(OperationTypes.GetUserOperationsHandler).to(GetUserOperationsHandler);
DIContainer.bind<IGetUserExtractHandler>(ExtractTypes.GetUserExtractHandler).to(GetUserExtractHandler);

// repositories
DIContainer.bind<IUserRepository>(UserTypes.UserRepository).to(UserRepository);
DIContainer.bind<IOperationRepository>(OperationTypes.OperationRepository).to(OperationRepository);

export default DIContainer;

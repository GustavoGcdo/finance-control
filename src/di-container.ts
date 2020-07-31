import { Container } from 'inversify';
import InfoTypes from './modules/info/types/info.types';
import { InfoController } from './presentation/controllers/info.controller';
import { InfoRoutes } from './presentation/routes/info.routes';
import { IInfoService } from './modules/info/services/info-service.interface';
import { InfoService } from './modules/info/services/info.service';
import { LoginController } from './presentation/controllers/login.controller';
import { ISignupHandler } from './modules/login/handlers/signup-handler.interface';
import LoginTypes from './modules/login/types/login.types';
import { SignupHandler } from './modules/login/handlers/signup.handler';
import { LoginRoutes } from './presentation/routes/login.routes';
import { IUserRepository } from './modules/users/repositories/user-repository.interface';
import UserTypes from './modules/users/types/user.types';
import { UserRepository } from './modules/users/repositories/user.repository';
import { IEncriptService } from './modules/shared/services/encript-service.interface';
import SharedTypes from './modules/shared/types/shared.types';
import { EncriptService } from './modules/shared/services/encript.service';

const DIContainer = new Container();

// routes
DIContainer.bind<InfoRoutes>(InfoRoutes).toSelf();
DIContainer.bind<LoginRoutes>(LoginRoutes).toSelf();

// controllers
DIContainer.bind<InfoController>(InfoController).toSelf();
DIContainer.bind<LoginController>(LoginController).toSelf();

// services
DIContainer.bind<IInfoService>(InfoTypes.InfoService).to(InfoService);
DIContainer.bind<IEncriptService>(SharedTypes.EncriptService).to(EncriptService);

// handlers
DIContainer.bind<ISignupHandler>(LoginTypes.SignupHandler).to(SignupHandler);

// repositories
DIContainer.bind<IUserRepository>(UserTypes.UserRepository).to(UserRepository);

export default DIContainer;
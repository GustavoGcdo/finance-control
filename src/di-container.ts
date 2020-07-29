import { Container } from 'inversify';
import InfoTypes from './modules/info/types/info.types';
import { InfoController } from './presentation/controllers/info.controller';
import { InfoRoutes } from './presentation/routes/info.route';
import { IInfoService } from './modules/info/services/info-service.interface';
import { InfoService } from './modules/info/services/info.service';

const DIContainer = new Container();

DIContainer.bind<InfoRoutes>(InfoRoutes).toSelf();
DIContainer.bind<InfoController>(InfoController).toSelf();
DIContainer.bind<IInfoService>(InfoTypes.InfoService).to(InfoService);

export default DIContainer;
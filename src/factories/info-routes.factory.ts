import { InfoService } from '../modules/info/services/info.service';
import { InfoController } from '../presentation/controllers/info.controller';
import { InfoRoutes } from '../presentation/routes/info.routes';

export const makeInfoRoutes = (): InfoRoutes => {
  const infoService = new InfoService();
  const infoController = new InfoController(infoService);
  const infoRoutes = new InfoRoutes(infoController);
  return infoRoutes;
}
;

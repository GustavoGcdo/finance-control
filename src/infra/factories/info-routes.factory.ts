import { InfoController } from '../controllers/info.controller';
import { InfoRoutes } from '../routes/info.routes';
import { InfoService } from '../services/info.service';

export const makeInfoRoutes = (): InfoRoutes => {
  const infoService = new InfoService();
  const infoController = new InfoController(infoService);
  const infoRoutes = new InfoRoutes(infoController);
  return infoRoutes;
}
;

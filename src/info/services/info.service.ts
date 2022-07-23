import { Info } from '../models/info';
import { IInfoService } from './info-service.interface';

export class InfoService implements IInfoService {
  getInfo(): Info {
    const { npm_package_name: packageName, npm_package_version: packageVersion } = process.env;

    const infoApi: Info = {
      name: packageName,
      version: packageVersion
    };
    return infoApi;
  }
}

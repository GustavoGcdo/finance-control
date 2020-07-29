import { IInfoService } from './info-service.interface';
import { injectable } from 'inversify';
import { Info } from '../models/info';

@injectable()
export class InfoService implements IInfoService {

    getInfo(): Info {
        const { npm_package_name, npm_package_version } = process.env;

        const infoApi: Info = {
            name: npm_package_name,
            version: npm_package_version,
        };
        return infoApi;
    }

}
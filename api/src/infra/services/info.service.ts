export interface Info {
  name?: string;
  version?: string;
}

export class InfoService {
  getInfo(): Info {
    const { npm_package_name: packageName, npm_package_version: packageVersion } = process.env;

    const infoApi: Info = {
      name: packageName,
      version: packageVersion
    };
    return infoApi;
  }
}

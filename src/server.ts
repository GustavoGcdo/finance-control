import { App } from './app';

async function bootstrap() {
  const application = new App();
  await application.create();
  application.start();
}

bootstrap();

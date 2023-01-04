import { App } from './app';

async function bootstrap() {
  try {
    const application = new App();
    await application.create();
    application.start();
  } catch (error) {
    console.log('[server]: Erro ao configurar aplicação');
    
  }
}

bootstrap();

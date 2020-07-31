import dotenv from 'dotenv';

const { NODE_ENV } = process.env;

switch (NODE_ENV) {
  case 'dev':
    dotenv.config({ path: '.env.dev' });
    break;

  case 'test':
    dotenv.config({ path: '.env.test' });
    break;

  default:
    dotenv.config();
    break;
}

export default {
  DB_URI: process.env.DB_URI || 'mongodb://localhost/finance-controll-db',    
  PORT: process.env.PORT || 3000,
  SALT_KEY: process.env.SALT_KEY || 'salt-key',
};

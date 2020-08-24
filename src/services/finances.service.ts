import { Result } from '../infra/models/result';
import api from './api';

const URL_SERVICE_BASE = '/finance';

export function getUserExtract(): Promise<Result> {
    console.log(api.defaults);
    
  return api
    .get(`${URL_SERVICE_BASE}/extract`)
    .then((response) => response.data);
}

export function getOperations(): Promise<Result> {
    console.log(api.defaults);
    
  return api
    .get(`${URL_SERVICE_BASE}/operations`)
    .then((response) => response.data);
}

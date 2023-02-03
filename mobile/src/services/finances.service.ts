import { Result } from '../infra/models/result';
import api from './api';
import { Operation } from '../models/operation';

const URL_SERVICE_BASE = '/finance';

export function getUserExtract(): Promise<Result> {
  return api
    .get(`${URL_SERVICE_BASE}/extract`)
    .then((response: ) => response.data);
}

export function getOperations(): Promise<Result> {
  return api
    .get(`${URL_SERVICE_BASE}/operations`)
    .then((response) => response.data);
}

export function addOperation(operation: Operation): Promise<Result> {
  return api
    .post(`${URL_SERVICE_BASE}/operations`, operation)
    .then((response) => response.data);
}

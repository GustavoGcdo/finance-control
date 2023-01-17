import queryString from 'query-string';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../constants/paginate.constants';
import { Result } from '../infra/models/result';
import { Operation } from '../models/operation';
import api from './api';

const URL_SERVICE_BASE = '/finance';

export function getUserExtract(): Promise<Result> {
  return api
    .get(`${URL_SERVICE_BASE}/extract`)
    .then((response) => response.data);
}

export function getOperations(page: number = DEFAULT_PAGE, limit: number = DEFAULT_LIMIT): Promise<Result> {
  const queryStringResult = queryString.stringify({ page, limit })
  return api
    .get(`${URL_SERVICE_BASE}/operations?${queryStringResult}`)
    .then((response) => response.data);
}

export function addOperation(operation: Operation): Promise<Result> {
  return api
    .post(`${URL_SERVICE_BASE}/operations`, operation)
    .then((response) => response.data);
}

export function updateOperation(id: string, operationToUpdate: Operation): Promise<Result> {
  return api
    .put(`${URL_SERVICE_BASE}/operations/${id}`, operationToUpdate)
    .then((response) => response.data);
}

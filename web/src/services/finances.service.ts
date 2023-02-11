import { format } from 'date-fns';
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

export function getOperations(page: number = DEFAULT_PAGE, date?: Date, limit: number = DEFAULT_LIMIT): Promise<Result> {
  const filter: Record<string, any> = { page, limit };
  if(date){
    filter.monthOfTheYear = format(date, 'MM-yyyy');
  }
  const queryStringResult = queryString.stringify(filter)
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

export function deleteOperation(id: string): Promise<Result> {
  return api
    .delete(`${URL_SERVICE_BASE}/operations/${id}`)
    .then((response) => response.data);
}

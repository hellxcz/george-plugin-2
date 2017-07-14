import request from './request';
import {
  Category,
  CategoryDetails,
  Collection,
  Transaction
} from './dtos';
import { Moment } from "moment/moment";

let apiUrl: string;

let defaultHeaders: any;

export function init(_apiUrl: string, _defaultHeaders: any) {

  apiUrl = _apiUrl;
  defaultHeaders = _defaultHeaders;

}

const catchFunc = () => {

};

function get<T>(urlTail: string): Promise<T> {

  return request(apiUrl + urlTail,
    {
      method: 'GET',
      headers: defaultHeaders
    })
    .catch(catchFunc)
    .then(logJson);

}

function logJson(json) {

  console.log(json);

  return json;
}

export function getCategories(): Promise<Collection<Category>> {
  return get('my/categorization/categories');
}

export function getCategoryDetails(category: string): Promise<CategoryDetails> {
  return get(`my/categorization/categories/${category}`);
}

export function getCategoryTransactions(category: string): Promise<Collection<Transaction>> {
  return get(`my/categorization/categories/${category}/transactions`);
}

export function getCategoryTransactionsByDate(category: string, from: Moment, to: Moment): Promise<Collection<Transaction>> {

  const dateFormat = 'YYYY-MM-DD';

  return get(`my/categorization/categories/${category}/transactions?from=${from.format(dateFormat)}&to=${to.format(dateFormat)}`);

}


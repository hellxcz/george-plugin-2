import request from './request';
import {
  Category,
  CategoryDetail,
  CategoryDetails,
  Collection,
  Transaction
} from './dtos';

let apiUrl: string;

let defaultHeaders : any;

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
      headers : defaultHeaders
    })
    .catch(catchFunc)
    .then(logJson);

}

function logJson(json){

  console.log(json);

  return json;
}

export function getCategories(): Promise<Collection<Category>> {
  return get('my/categorization/categories');
}

export function getCategoryDetails(category) : Promise<CategoryDetails> {
  return get(`my/categorization/categories/${category}`);
}

export function getCategoryTransactions(category): Promise<Collection<Transaction>> {
  return get(`my/categorization/categories/${category}/transactions`);
}

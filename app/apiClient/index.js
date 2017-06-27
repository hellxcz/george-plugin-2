import request from './request';

let apiUrl;

let defaultHeaders;

export function init(_apiUrl, _defaultHeaders) {

  apiUrl = _apiUrl;
  defaultHeaders = _defaultHeaders;

}

const catchFunc = () => {

};

function get(urlTail) {

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

export function getCategories() {
  return get('my/categorization/categories');
}

export function getCategoryDetails(category) {

  return get(`my/categorization/categories/${category}`);

}

export function getCategoryTransactions(category) {

  return get(`my/categorization/categories/${category}/transactions`);
}

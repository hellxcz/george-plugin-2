// george.config.georgeApiUrl

export function getApiUrl() {

  return george.config.georgeApiUrl;

}

export function getToken() {

  return george.current.token;

}

export function getAuthorizationHeader() {

  return "Bearer " + getToken();

}

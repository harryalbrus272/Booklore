//all function required in multiple places
//Converting all the params to x-www-urlencoded format
export function getFormBody(params) {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
}

//Accessing tokens
export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

function decodeQueryParamPart(part) {
  // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
  //console.log(part,'part');
  part = part.replace(/\+/gm, '%20');
  return decodeURIComponent(part);
}

export default function parseQueryString(queryString) {
  var pairs = queryString.split("&"), queryParams = {};
  for(let i=0; i < pairs.length; i++) {
    let pair      = pairs[i].split('='),
        key       = decodeQueryParamPart(pair[0]),
        keyLength = key.length,
        isArray = false,
        value;
    if (pair.length === 1) {
      value = 'true';
    } else {
      if (keyLength > 2 && key.slice(keyLength -2) === '[]') {
        isArray = true;
        key = key.slice(0, keyLength - 2);
        if(!queryParams[key]) {
          queryParams[key] = [];
        }
      }
      value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
    }
    if (isArray) {
      queryParams[key].push(value);
    } else {
      if (queryParams[key]) {
        if (typeof queryParams[key] !== 'object') {
          queryParams[key] = [queryParams[key]];
        }
        queryParams[key].push(value);
      } else {
        queryParams[key] = value;
      }
    }
  }
  return queryParams;
}
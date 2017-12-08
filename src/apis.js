const toRequest = (url, method, headers, payload, isFormData) => {
  const HEADERS = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  let URL = url;
  let configOpts = {
    method: (method || 'POST').toUpperCase(),
    credentials: 'include',
    headers: {...HEADERS, ...headers},
    body: isFormData ? payload : JSON.stringify(payload),
  }
  if (configOpts.method === 'GET') {
    URL += '?';
    Object.keys(payload).forEach(item => {
      URL += `${item}=${payload[item]}&`;
    })
    URL = URL.slice(0, URL.length - 1);
    configOpts.body = JSON.stringify();
  }
  console.log(configOpts)
  return new Promise((resolve, reject) => {
    fetch(URL, configOpts)
    .then(resp => {
      console.log(resp)
      return resp.json()
      .then(json => {
        if (resp.ok) {
          return json;
        } else {
          const error = {...json, status: resp.status, statusText: resp.statusText};
          return Promise.reject(error);
        }
      })
    })
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      console.log('error',err)
      reject(err);
    })
  });
}

export default {
  getUserInfo(payload) {
    return toRequest('/config/updatename', 'post', {}, payload);
  },
  getUserCount(payload) {
    return toRequest('/config/register', 'post', {}, payload);
  },
  uploadFiles(payload) {
    return toRequest('/config/uploadfiles', 'post', {}, payload, true);
  }
}
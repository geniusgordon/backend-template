import fetch from 'isomorphic-fetch';

function get(path, headers) {
  return fetch(path, { headers });
}

function post(path, data, headers) {
  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });
}

export default { get, post };


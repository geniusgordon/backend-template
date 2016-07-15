import fetch from 'isomorphic-fetch';

function get(path, headers) {
  return fetch(path, {
    headers: Object.assign({}, headers),
  });
}

function post(path, data, headers) {
  return fetch(path, {
    method: 'POST',
    headers: Object.assign({}, {
      'Content-Type': 'application/json',
    }, headers),
    body: JSON.stringify(data),
  });
}

export default { get, post };


import axios from 'axios';
import { expect } from 'chai';

export function postWithError(url, data) {
  return axios.post(url, data, {
    validateStatus: null,
  }).then(({ status, data }) => {
    expect(status).to.equal(400);
    return data;
  });
}


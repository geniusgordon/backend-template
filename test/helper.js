import axios from 'axios';
import { expect } from 'chai';

export function postWithError(url, data, errorCode) {
  return axios.post(url, data, {
    validateStatus: null,
  }).then(({ status, data }) => {
    expect(status).to.equal(errorCode);
    return data;
  });
}


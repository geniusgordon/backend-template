import { expect } from 'chai';
import bearerToken from '../../src/middlewares/bearer-token';

describe.only('bearerToken', () => {
  const token = 'test-token';
  const bearerTokenMiddleware = bearerToken();

  it('gets token from query string', (done) => {
    const req = {
      query: { access_token: token },
    };
    bearerTokenMiddleware(req, {}, () => {
      expect(req.token).to.equal(token);
      done();
    });
  });

  it('gets token from post body', (done) => {
    const req = {
      body: { access_token: token },
    };
    bearerTokenMiddleware(req, {}, () => {
      expect(req.token).to.equal(token);
      done();
    });
  });

  it('gets token from authorization header', (done) => {
    const req = {
      headers: { authorization: `Bearer ${token}` },
    };
    bearerTokenMiddleware(req, {}, () => {
      expect(req.token).to.equal(token);
      done();
    });
  });

  it('should throw error if token is provided in more than one locatoin', () => {
		const req = {
      query: { access_token: 'query-token' },
      body: { access_token: 'query-token' },
      headers: { authorization: 'bearer header-token' },
    };
    expect(() => {
      bearerTokenMiddleware(req, {}, () => {});
    }).to.throw(Error);
  });
});


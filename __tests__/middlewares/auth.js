import { bearerToken } from '../../src/middlewares/auth';

describe('bearerToken', () => {
  const token = 'test-token';

  it('gets token from query string', (done) => {
    const req = {
      query: { access_token: token },
    };
    bearerToken(req, {}, () => {
      expect(req.token).toEqual(token);
      done();
    });
  });

  it('gets token from post body', (done) => {
    const req = {
      body: { access_token: token },
    };
    bearerToken(req, {}, () => {
      expect(req.token).toEqual(token);
      done();
    });
  });

  it('gets token from authorization header', (done) => {
    const req = {
      headers: { authorization: `Bearer ${token}` },
    };
    bearerToken(req, {}, () => {
      expect(req.token).toEqual(token);
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
      bearerToken(req, {}, () => {});
    }).toThrow();
  });
});


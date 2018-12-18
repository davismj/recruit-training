import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IClaims } from 'models/claims';

const sameOrigin = function sameOrigin(request: Request): boolean {
  return location && request.url.match(location.origin) !== null;
}

const decode = function decode(jwt) {
  const [, payload, ] = jwt.split('.');
  return JSON.parse(atob(payload));
}

@inject(HttpClient)
export class AuthService {

  session?: IClaims;
  jwt?: string;

  constructor(private http: HttpClient) {
    window.addEventListener('message', ({ data: { type, data } }) => {
      if (type === 'signin') {
        this.signin(data);
      }
    });
    http.configure((config) => {
      config.withInterceptor({
        request: (request) => this.requestInterceptor(request)
      })
    });
  }

  async login(): Promise<void> {
    await Promise.resolve(this.session ? this.logout() : null);
    window.open('/api/oauth/google');
  }

  async logout(): Promise<void> {
    await this.http.post('/api/oauth/google/revoke', null)
    this.signout();
  }

  private signin(jwt) {
    this.session = decode(jwt);
    this.jwt = jwt;
  }

  private signout() {
    this.session = null;
    this.jwt = null;
  }

  private requestInterceptor(request: Request) {
    if (this.jwt && sameOrigin(request)) {
      request.headers.set('Authentication', `Bearer ${this.jwt}`);
    }
    return request;
  }
}

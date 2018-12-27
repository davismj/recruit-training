import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IClaims } from 'models/claims';

const decode = function decode(jwt): IClaims {
  const [, payload, ] = jwt.split('.');
  return JSON.parse(atob(payload));
}

const sameOrigin = function sameOrigin(request: Request): boolean {
  return location && request.url.match(location.origin) !== null;
}

const LOGIN_TIMEOUT = 30;
let resolveLoginPromise: (IClaims) => void = null;

@inject(HttpClient)
export class AuthService {

  get jwt(): string {
    return localStorage.getItem('authservice.jwt');
  }

  set jwt(val: string) {
    if (!val) {
      localStorage.removeItem('authservice.jwt')
    } else {
      localStorage.setItem('authservice.jwt', val);
    }
  }

  session: IClaims = null;

  constructor(
    private http: HttpClient) {
    if (this.jwt) {
      this.signin(this.jwt);
    }
    window.addEventListener('message', ({ data: { type, data } }) => {
      if (type === 'signin') {
        this.signin(data);
      }
    });
    http.configure((config) => {
      config.withInterceptor({
        request: (req: Request) => this.requestInterceptor(req)
      });
    });
  }

  async login(): Promise<IClaims> {
    await Promise.resolve(this.session ? this.logout() : null)
    window.open('/api/oauth/google');
    return await new Promise((resolve, reject) => {
      resolveLoginPromise = resolve;
      setTimeout(() => {
        resolveLoginPromise = null;
        reject(`No response after ${LOGIN_TIMEOUT} seconds.`);
      }, LOGIN_TIMEOUT * 1000);
    });
  }

  async logout(): Promise<void> {
    await this.http.post('/api/oauth/google/revoke', null)
    this.signout();
  }

  private signin(jwt: string) {
    this.jwt = jwt;
    this.session = decode(jwt);
    if (resolveLoginPromise) {
      resolveLoginPromise(this.session);
    }
  }

  private signout() {
    this.jwt = null;
    this.session = null
  }

  private requestInterceptor(request: Request) {
    if (this.jwt && sameOrigin(request)) {
      request.headers.set('Authentication', `Bearer ${this.jwt}`);
      request.headers.set('Same-Origin', 'true')
    }
    return request;
  }
}

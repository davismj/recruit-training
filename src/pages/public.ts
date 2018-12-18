import { inject, PLATFORM, } from 'aurelia-framework';
import { Router } from 'aurelia-router';

export class PublicViewModel {

  private router: Router;

  configureRouter(config, router) {
    config.map([
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('pages/login') }
    ])
    config.mapUnknownRoutes({ redirect: 'login' });
    this.router = router;
  }
}

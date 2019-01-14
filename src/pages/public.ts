import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-framework';

export class PublicViewModel {

  private router: Router;

  configureRouter(config, router) {
    this.router = router;
    config.map([
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('pages/login') },
    ])
    config.mapUnknownRoutes(PLATFORM.moduleName('pages/login'));
    config.options.root = '/';
    config.options.pushState = true;
  }
}

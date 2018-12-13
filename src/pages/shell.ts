import { PLATFORM } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';

export class ShellViewModel {

  private router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.map([
      { route: '', redirect: 'contact' },
      { route: 'contact', moduleId: PLATFORM.moduleName('pages/contact-list'), name: 'contact-list', title: 'Contacts', nav: true },
      { route: 'contact/:id', moduleId: PLATFORM.moduleName('pages/contact-list'), name: 'contact-detail' },
    ]);
  }
}

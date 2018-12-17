import { inject, PLATFORM } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';
import { NotificationService } from 'services/notification';

@inject(I18N, NotificationService)
export class ShellViewModel {

  locale: string;

  private router: Router;

  constructor(
    private i18n: I18N,
    private notificationService: NotificationService) {
    this.locale = i18n.getLocale();
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.map([
      { route: '', redirect: 'contact' },
      { route: 'contact', moduleId: PLATFORM.moduleName('pages/contact-list'), name: 'contact-list', title: 'shell.CONTACT_LIST', nav: true },
      { route: 'contact/:id', moduleId: PLATFORM.moduleName('pages/contact-list'), name: 'contact-detail' },
    ]);
  }

  updateLocale() {
    this.i18n.setLocale(this.locale);
    this.notificationService.notify({
      message: `Locale updated: ${this.locale}.`,
      type: this.locale === 'en-US' ? 'warning' : 'info'
    })
  }
}

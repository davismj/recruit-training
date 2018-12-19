import { inject, PLATFORM, Aurelia } from 'aurelia-framework';
import { RouterConfiguration, Router, NavigationInstruction } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';
import { NotificationService } from 'services/notification';
import { AuthService } from 'services/auth';
import { Permissions } from 'models/claims';

@inject(I18N, NotificationService, AuthService, Aurelia)
export class ShellViewModel {

  locale: string;

  private router: Router;

  constructor(
    private i18n: I18N,
    private notificationService: NotificationService,
    private authService: AuthService,
    private aurelia: Aurelia) {
    this.locale = i18n.getLocale();
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.map([
      { route: '', redirect: 'contact' },
      { route: 'contact', moduleId: PLATFORM.moduleName('pages/contact-list'), name: 'contact-list', title: 'shell.CONTACT_LIST', nav: true, settings: { permissions: Permissions.ViewContacts } },
      { route: 'contact/:id', moduleId: PLATFORM.moduleName('pages/contact-list'), name: 'contact-detail', settings: { permissions: Permissions.ViewContacts | Permissions.EditContacts} },
      { route: 'login', redirect: 'contact' }
    ]);
    config.addAuthorizeStep(AuthStep);
  }

  updateLocale() {
    this.i18n.setLocale(this.locale);
    this.notificationService.notify({
      message: `Locale updated: ${this.locale}.`,
      type: this.locale === 'en-US' ? 'warning' : 'info'
    })
  }

  async logout() {
    await this.authService.logout();
    this.aurelia.setRoot(PLATFORM.moduleName('pages/public'));
  }
}

@inject(AuthService)
class AuthStep {

  constructor(
    private authService: AuthService) { }

  run(navigationInstruction: NavigationInstruction, next) {

    const { session } = this.authService;
    const instructions = navigationInstruction.getAllInstructions();

    const denied = instructions
      .map((instruction) => instruction.config.settings.permissions)
      .some((permissions: number) => (permissions & session.permissions) !== permissions);

    if (denied) {
      return next.cancel();
    }

    return next();
  }
}

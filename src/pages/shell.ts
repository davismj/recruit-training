import { PLATFORM, inject, Aurelia } from 'aurelia-framework';
import { RouterConfiguration, Router, NavigationInstruction } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';
import { NotificationService } from 'services/notification';
import { AuthService } from 'services/auth';
import { Permissions } from 'models/claims';

@inject(I18N, NotificationService, AuthService, Aurelia)
export class ShellViewModel {

  private router: Router;

  locale: string;

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
      {
        route: 'contact',
        name: 'contact-list',
        title: 'shell.CONTACT_LIST',
        nav: true,
        moduleId: PLATFORM.moduleName('pages/contact-list'),
        settings: {
          permissions: Permissions.ViewContacts
        }
      },
      {
        route: 'contact/:id',
        name: 'contact-detail',
        moduleId: PLATFORM.moduleName('pages/contact-list'),
        settings: {
          permissions: Permissions.ViewContacts | Permissions.EditContacts
        }
      }
    ]);
    config.mapUnknownRoutes(PLATFORM.moduleName('pages/contact-list'));
    config.options.root = '/';
    config.options.pushState = true;
    config.addAuthorizeStep(AuthorizeStep);
  }

  updateLocale() {
    this.i18n.setLocale(this.locale);
    this.notificationService.notify({
      message: `Locale updated: ${this.locale}.`,
      type: this.locale === 'en-US' ? 'warning' : 'info'
    })
  }

  logout() {
    this.authService.logout();
    this.aurelia.setRoot(PLATFORM.moduleName('pages/public'));
  }
}

@inject(AuthService)
class AuthorizeStep {

  constructor(
    private authService: AuthService) { }

  run(navigationInstruction: NavigationInstruction, next) {

    const session = this.authService.session;
    const instructions = navigationInstruction.getAllInstructions();

    const required = instructions
      .map((instruction) => instruction.config.settings.permissions)
      .reduce((current, newPermissions) => current | newPermissions, Permissions.None);

    debugger;

    if (required !== Permissions.None) {
      const { permissions } = session || { permissions: Permissions.None };
      const authorized = Permissions.checkPermissions(required, session.permissions);
      if (!authorized) {
        return next.cancel();
      }
    }

    return next();
  }
}

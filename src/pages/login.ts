import { inject, PLATFORM, Aurelia } from 'aurelia-framework';
import { AuthService } from 'services/auth';

@inject(Aurelia, AuthService)
export class LoginViewModel {
  constructor(
    private aurelia: Aurelia,
    private authService: AuthService) { }

  async login() {
    const session = await this.authService.login();
    if (session) {
      await this.aurelia.setRoot(PLATFORM.moduleName('pages/shell'));
    }
  }
}

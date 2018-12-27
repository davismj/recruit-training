import {Aurelia} from 'aurelia-framework'
import { HttpClient } from 'aurelia-fetch-client';
import {PLATFORM} from 'aurelia-pal';
import environment from './environment';
import { MockHttpClient } from './mock';
import { AuthService } from 'services/auth';
import { TCustomAttribute } from 'aurelia-i18n';
import * as Backend from 'i18next-xhr-backend';
import './styles.scss';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
      const aliases = ['t'];
      const match = location.href.match(/[\?\&]lng=(\w{2})/i);
      TCustomAttribute.configureAliases(aliases);
      instance.i18next.use(Backend);
      return instance.setup({
        backend: {
          loadPath: './locales/{{lng}}/{{ns}}.json',
        },
        lng: match ? match[1] : navigator.language,
        fallbackLng: 'ja',
        load: 'languageOnly',
        attributes: aliases
      });
    })
    .plugin(PLATFORM.moduleName('aurelia-validation'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.container.registerSingleton(HttpClient, MockHttpClient);

  const authService = aurelia.container.get(AuthService);
  const loggedIn = !!authService.session;

  await aurelia.start();
  const shell = aurelia.container.get('pages/shell');
  aurelia.enhance({
    value: 'a'
  }, document.body)
  );
}

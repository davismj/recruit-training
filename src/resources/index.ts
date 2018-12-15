import { PLATFORM, FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/collapse'),
    PLATFORM.moduleName('./value-converters/date')
  ]);
}

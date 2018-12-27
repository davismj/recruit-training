import { PLATFORM, FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('resources/elements/collapse'),
    PLATFORM.moduleName('resources/elements/collapse-group'),
    PLATFORM.moduleName('resources/elements/dismiss-button.html'),
    PLATFORM.moduleName('resources/elements/notifications'),
    PLATFORM.moduleName('resources/elements/notification-list'),
    PLATFORM.moduleName('resources/value-converters/date'),
    PLATFORM.moduleName('resources/value-converters/date-time'),
    PLATFORM.moduleName('resources/value-converters/number')
  ]);
}

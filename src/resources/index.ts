import { PLATFORM, FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/collapse'),
    PLATFORM.moduleName('./elements/collapse-group'),
    PLATFORM.moduleName('./elements/leaflet-map'),
    PLATFORM.moduleName('./elements/leaflet-marker'),
    PLATFORM.moduleName('./elements/notifications'),
    PLATFORM.moduleName('./elements/notification-list'),
    PLATFORM.moduleName('./value-converters/date'),
    PLATFORM.moduleName('./value-converters/number'),
    PLATFORM.moduleName('./value-converters/time')
  ]);
}

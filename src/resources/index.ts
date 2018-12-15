import { PLATFORM, FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/collapse'),
    PLATFORM.moduleName('./elements/collapse-group'),
    PLATFORM.moduleName('./elements/leaflet-map'),
    PLATFORM.moduleName('./value-converters/date'),
    PLATFORM.moduleName('./value-converters/number')
  ]);
}

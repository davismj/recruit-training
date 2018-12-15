import 'leaflet/leaflet.css';
import L from 'leaflet';
import { inject, inlineView, bindable, bindingMode, DOM } from 'aurelia-framework';
import './leaflet-map.scss';
import { dispatch } from 'utils/dispatch';

const DISTANCE_TOLERANCE = 0.001;

@inject(DOM.Element)
@inlineView('<template class="leaflet-element"><slot></slot></template>')
export class LeafletMapCustomElement {

  @bindable({ defaultBindingMode: bindingMode.twoWay, changeHandler: 'centerChanged' }) lat = 43.06853827090299;
  @bindable({ defaultBindingMode: bindingMode.twoWay, changeHandler: 'centerChanged' }) lng = 141.35097182809068;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) zoom = 14;
  @bindable() inertia = true;
  @bindable({ attribute: 'zoom-control' }) showZoomControl = true;

  map: L;

  private panTimeout = null;

  constructor(private element: HTMLElement) { }

  attached() {
    const { lat, lng, zoom, inertia, showZoomControl } = this;
    const map = this.map = L.map(this.element, { center: [lat, lng], zoom, inertia, zoomControl: showZoomControl });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.zoomControl = map.zoomControl || L.control.zoom();

    map.on('zoomend', (event) => this.zoom = map.getZoom());
    map.on('moveend', (event) => {
      const center = map.getCenter();
      if (Math.abs(center.lat - this.lat) > DISTANCE_TOLERANCE) {
        this.lat = center.lat;
      }
      if (Math.abs(center.lng - this.lng) > DISTANCE_TOLERANCE) {
        this.lng = center.lng;
      }
    });
    map.on('moveend zoomend', (event) => dispatch(this.element, event.type, this.map));
  }

  private centerChanged() {
    if (!this.map) {
      return;
    }
    const { lat, lng, panTimeout } = this;
    if (panTimeout) {
      clearTimeout(panTimeout);
    }
    this.panTimeout = setTimeout(() => {
      this.map.panTo([lat, lng]);
    }, 250);
  }

  private zoomChanged(zoom) {
    if (!this.map) {
      return;
    }
    this.map.setZoom(zoom);
  }

  private inertiaChanged(inertia) {
    if (!this.map) {
      return;
    }
    this.map.options.inertia = !!inertia;
  }

  private showZoomControlChanged(zoomControl) {
    if (!this.map) {
      return;
    }
    if (zoomControl) {
      this.map.addControl(this.map.zoomControl);
    } else {
      this.map.removeControl(this.map.zoomControl);
    }
  }
}

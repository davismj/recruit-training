import { inject, bindable, bindingMode } from 'aurelia-framework';
import 'leaflet/leaflet.css';
import L from 'leaflet';
import './_leaflet-map.scss';

@inject(Element)
export class LeafletMapCustomElement {

  @bindable({
    defaultBindingMode: bindingMode.twoWay,
    changeHandler: 'centerChanged'
  }) lat: number = 43.06853827090299;
  @bindable({
    defaultBindingMode: bindingMode.twoWay,
    changeHandler: 'centerChanged'
  }) lng: number = 141.35097182809068;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) zoom: number = 14;
  @bindable() inertia = true;
  @bindable({ attribute: 'zoom-control' }) showZoomControl = true;

  private map: L.Map;

  private panTimeout;

  constructor(
    public element: Element) { }

  /**
   * Adds a marker to the map.
   * @param {L.Marker} marker A leaflet marker.
   */
  addMarker(marker: L.Marker) {
    marker.addTo(this.map);
  }

  /**
   * Removes a marker from the map.
   * @param {L.Marker} marker A leaflet marker.
   */
  removeMarker(marker: L.Marker) {
    marker.removeFrom(this.map);
  }
  private attached() {
    const { lat, lng, zoom, inertia, showZoomControl } = this;
    const element = this.element.querySelector('.leaflet-map');
    const map = this.map = L.map(element, {
      center: [lat, lng],
      zoom,
      inertia,
      zoomControl: showZoomControl
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.zoomControl = map.zoomControl || L.control.zoom();

    map.on('zoomend', (event) => this.zoom = map.getZoom());
    map.on('moveend', (event) => {
      const center = map.getCenter();
      if (Math.abs(this.lat - center.lat) > 0.001) {
        this.lat = center.lat
      }
      if (Math.abs(this.lng - center.lng) > 0.001) {
        this.lng = center.lng;
      }
    });
    map.on('moveend zoomend click dblclick', (event) => {
      this.element.dispatchEvent(
        new CustomEvent(event.type, {
          detail: event
        })
      );
    });
  }

  private detached() {
    // this.map.remove();
  }

  private centerChanged() {
    if (!this.map) {
      return;
    }
    const { lat, lng, panTimeout } = this; // lat = ...
    if (panTimeout) {
      clearTimeout(panTimeout);
    }
    this.panTimeout = setTimeout(() => {
      this.map.panTo([lat, lng]); // lat = ...
    }, 250);
  }

  private zoomChanged() {
    if (!this.map) {
      return;
    }
    this.map.setZoom(this.zoom);
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

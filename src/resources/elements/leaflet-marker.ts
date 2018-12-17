import L from 'leaflet';
import { inject, bindable, noView } from 'aurelia-framework';
import { LeafletMapCustomElement } from './leaflet-map';
import { dispatch } from 'utils/dispatch';

// INFO [Matt]
// Required for webpack, see https://stackoverflow.com/questions/50864855
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

@noView()
@inject(Element, LeafletMapCustomElement)
export class LeafletMarkerCustomElement {

  @bindable({ changeHandler: 'centerChanged' }) lat;
  @bindable({ changeHandler: 'centerChanged' }) lng;

  private marker: L.Marker;

  constructor(
    private element: Element,
    private map: LeafletMapCustomElement) { }

  private attached() {
    const { lat, lng } = this;
    const marker = this.marker = L.marker([lat, lng]);
    this.map.addMarker(marker);
    marker.on('moveend click dblclick', (event) => dispatch(this.element, event.type, event));
  }

  private unbind() {
    this.map.removeMarker(this.marker);
  }

  private centerChanged() {
    if (this.marker) {
      this.marker.setLatLng([this.lat, this.lng]);
    }
  }
}

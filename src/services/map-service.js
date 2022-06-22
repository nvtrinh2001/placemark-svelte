import * as L from "leaflet";
import { addNewLocation, updatedLocationId, storeTypeMap } from "../stores.js";

export class LeafletMap {
  imap = {};
  control = {};
  overlays = {};

  // https://leaflet-extras.github.io/leaflet-providers/preview/

  baseLayers = {
    Terrain: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 17,
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    }),
    Satellite: L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      }
    ),
  };

  constructor(id, descriptor, activeLayer = "") {
    let defaultLayer = this.baseLayers.Terrain;
    if (activeLayer) {
      defaultLayer = this.baseLayers[activeLayer];
    }
    this.imap = L.map(id, {
      center: [descriptor.location.lat, descriptor.location.lng],
      zoom: descriptor.zoom,
      minZoom: descriptor.minZoom,
      zoomControl: false,
      layers: [defaultLayer],
    });
  }

  addLayer(title, layer) {
    this.overlays[title] = layer;
    this.imap.addLayer(layer);
  }

  addLayerGroup(title) {
    this.overlays[title] = L.layerGroup([]);
    this.imap.addLayer(this.overlays[title]);
  }

  showLayerControl() {
    this.control = L.control
      .layers(this.baseLayers, this.overlays)
      .addTo(this.imap);
  }

  showZoomControl(position = "topleft") {
    L.control
      .zoom({
        position: position,
      })
      .addTo(this.imap);
  }

  moveTo(zoom, location) {
    this.imap.setZoom(zoom);
    this.imap.panTo(new L.LatLng(location.lat, location.lng));
  }

  zoomTo(location) {
    this.imap.setView(new L.LatLng(location.lat, location.lng), 8);
  }

  addMarker(
    location,
    popupText = "",
    layerTitle = "default",
    typeMap,
    locationId
  ) {
    let group = {};
    let marker = L.marker([location.lat, location.lng]);
    if (popupText) {
      var popup = L.popup({ autoClose: true, closeOnClick: true });

      if (typeMap === "favorite") {
        var content = L.DomUtil.create("div", "content");
        content.innerHTML = `<p style="text-align: center">${popupText}</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <a 
              href="/#/favorite/remove" 
              id="${locationId}" 
              style="margin-right: 6px;"
              class="button is-small is-danger is-rounded">
                Remove
            </a>
            <a 
              href="/#/details/${locationId}" 
              id="${locationId}"
              style="margin-left: 6px;"
              class="button is-small is-info is-rounded">
                Details
            </a>
          </div>`;
        popup.setContent(content);
        // remove button
        const removePopupElement = popup._content.lastElementChild.children[0];
        removePopupElement.addEventListener("click", function (e) {
          // console.log(e.target.id);
          updatedLocationId.set({ id: e.target.id });
        });

        // detail button
        const detailsPopupElement = popup._content.lastElementChild.children[1];
        detailsPopupElement.addEventListener("click", function (e) {
          updatedLocationId.set({ id: e.target.id });
        });
        storeTypeMap.set({ type: "favorite" });

        // console.log([popup._content]);
      } else if (typeMap === "discovery") {
        let returnedData = `${location.lat},${location.lng}`;
        var content = L.DomUtil.create("div", "content");
        content.innerHTML = `<p style="text-align: center">${popupText}</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <a 
              href="/#/favorite/add" 
              id="${returnedData}" 
              style="margin-right: 6px;"
              class="button is-small is-danger is-rounded">
                Add to Favorite
            </a>
            <a 
              href="/#/details/${locationId}" 
              id="${locationId}"
              style="margin-left: 6px;"
              class="button is-small is-info is-rounded">
                Details
            </a>
          </div>`;
        popup.setContent(content);
        // remove button
        const addPopupElement = popup._content.lastElementChild.children[0];
        // console.log([addPopupElement]);
        addPopupElement.addEventListener("click", function (e) {
          // console.log(e.target.id);
          let returnedCoordinates = e.target.id.split(",");
          addNewLocation.set({
            lat: returnedCoordinates[0],
            lng: returnedCoordinates[1],
          });
          console.log(returnedCoordinates[0], returnedCoordinates[1]);
        });

        // detail button
        storeTypeMap.set({ type: "discovery" });
      } else {
        let returnedData = `${location.lat},${location.lng}`;

        var content = L.DomUtil.create("div", "content");
        content.innerHTML = `<p style="text-align: center">${popupText}</p>
          <a 
            href="/#/favorite/add" 
            id=${returnedData} 
            class="button is-small is-info is-rounded">
              Add to Favorite
          </a>`;
        popup.setContent(content);
        const addPopupElement = popup._content.lastChild;
        // console.log([addPopupElement]);
        addPopupElement.addEventListener("click", function (e) {
          // console.log(e.target.id);
          let returnedCoordinates = e.target.id.split(",");
          addNewLocation.set({
            lat: returnedCoordinates[0],
            lng: returnedCoordinates[1],
          });
          console.log(returnedCoordinates[0], returnedCoordinates[1]);
        });
      }
      marker.bindPopup(popup);
    }
    if (!this.overlays[layerTitle]) {
      group = L.layerGroup([]);
      this.overlays[layerTitle] = group;
      this.imap.addLayer(group);
    } else {
      group = this.overlays[layerTitle];
    }
    marker.addTo(group);
  }

  invalidateSize() {
    this.imap.invalidateSize();
    let hiddenMethodMap = this.imap;
    hiddenMethodMap._onResize();
  }

  showCoordinatesOfMouseClick() {
    this.imap.on("click", (e) => {
      addNewLocation.set({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });

      L.popup()
        .setLatLng(e.latlng)
        .setContent(
          `<p>You clicked the map at:
            <br />
            (${e.latlng.lat.toString()}, ${e.latlng.lng.toString()})
          </p>
          <a 
            href="/#/favorite/add" 
            class="button is-small is-info is-rounded">
              Add to Favorite
          </a>`
        )
        .openOn(this.imap);

      console.log(e.latlng.lat, e.latlng.lng);
    });
  }

  showCoordinatesOfMouseClickDiscovery() {
    this.imap.on("click", (e) => {
      addNewLocation.set({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });

      L.popup()
        .setLatLng(e.latlng)
        .setContent(
          `<p>You clicked the map at:
            <br />
            (${e.latlng.lat.toString()}, ${e.latlng.lng.toString()})
          </p>
          <a 
            href="/#/discovery/add" 
            class="button is-small is-info is-rounded">
              Add to London Discovery
          </a>`
        )
        .openOn(this.imap);

      console.log(e.latlng.lat, e.latlng.lng);
    });
  }
}

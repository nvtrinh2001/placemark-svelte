<script>
  import "leaflet/dist/leaflet.css";
  import { LeafletMap } from "../services/map-service.js";
  import { onMount } from "svelte";
  import { location } from "../stores.js";

  const mapConfig = {
    location: { lat: 52.160858, lng: -7.15242 },
    zoom: 8,
    minZoom: 1,
  };
  let map = null;

  onMount(async () => {
    map = new LeafletMap("placemark-map", mapConfig);
    map.showZoomControl();
    map.addLayerGroup("Attractions");
    map.addLayerGroup("Hotels");
    map.addLayerGroup("Restaurants");
    map.showLayerControl();
    map.showCoordinatesOfMouseClick();
  });

  async function addPlacemarkMarker() {
    let placemarkStr;
    for (let i = 0; i < $location.location_array.length; i++) {
      let type;
      placemarkStr = $location.location_array[i].name;
      if ($location.type === "attraction") {
        type = "Attractions";
      } else if ($location.type === "hotel") {
        type = "Hotels";
      } else if ($location.type === "restaurant") {
        type = "Restaurants";
      }
      const typeMap = "search";
      map.addMarker(
        $location.location_array[i],
        placemarkStr,
        type,
        typeMap,
        "none"
      );
    }
    map.moveTo(11, { lat: $location.lat, lng: $location.lng });

    console.log($location.location_array);
  }
</script>

<div
  class="box"
  id="placemark-map"
  style=" height:624px;margin-top: 60px; margin-bottom: 12px; z-index: 1;"
/>
<form
  class=""
  on:submit|preventDefault={addPlacemarkMarker}
  style="display: flex; justify-content: space-between; align-items: center; "
>
  <p class="" style="color: #aaa; font-size: 14px;">
    After searching, click the button to show all the markers, click twice if it
    doesn't work the first time...
  </p>
  <button class="button is-small is-right is-link">Show on Map</button>
</form>

<script>
  import "leaflet/dist/leaflet.css";
  import { LeafletMap } from "../services/map-service.js";
  import { getContext, onMount } from "svelte";

  const placemarkService = getContext("PlacemarkService");

  const mapConfig = {
    location: { lat: 52.160858, lng: -7.15242 },
    zoom: 8,
    minZoom: 1,
  };
  let map = null;

  onMount(async () => {
    const allLocations = await placemarkService.getAllLocations();
    mapConfig.location.lat = allLocations[allLocations.length - 1].lat;
    mapConfig.location.lng = allLocations[allLocations.length - 1].lng;

    map = new LeafletMap("placemark-map", mapConfig);
    map.showZoomControl();
    map.addLayerGroup("Attractions");
    map.addLayerGroup("Hotels");
    map.addLayerGroup("Restaurants");
    map.showLayerControl();
    map.showCoordinatesOfMouseClick();

    for (let i = 0; i < allLocations.length; i++) {
      let type;
      if (allLocations[i].type === "attraction") {
        type = "Attractions";
      } else if (allLocations[i].type === "hotel") {
        type = "Hotels";
      } else if (allLocations[i].type === "restaurant") {
        type = "Restaurants";
      }

      map.addMarker(
        { lat: allLocations[i].lat, lng: allLocations[i].lng },
        allLocations[i].name,
        type,
        "favorite",
        allLocations[i]._id
      );
    }
  });
</script>

<div
  class="box"
  id="placemark-map"
  style=" height:662px;margin-top: 60px; margin-bottom: 12px; z-index: 1;"
/>

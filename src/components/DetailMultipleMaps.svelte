<script>
  import "leaflet/dist/leaflet.css";
  import { LeafletMap } from "../services/map-service.js";
  import { getContext, onMount } from "svelte";
  import { storeTypeMap } from "../stores.js";

  const placemarkService = getContext("PlacemarkService");
  let location;

  const mapConfig = {
    location: { lat: 52.160858, lng: -7.15242 },
    zoom: 8,
    minZoom: 1,
  };
  let map1 = null;
  let map2 = null;
  let map3 = null;

  onMount(async () => {
    if ($storeTypeMap.type === "discovery") {
      location = await placemarkService.getLondonLocationById(
        window.location.hash.slice(10)
      );
    } else {
      location = await placemarkService.getLocationById(
        window.location.hash.slice(10)
      );
    }

    console.log(location);

    mapConfig.location.lat = Number(location.lat);
    mapConfig.location.lng = Number(location.lng);
    map1 = new LeafletMap("placemark-map-1", mapConfig);
    mapConfig.zoom = 5;
    map2 = new LeafletMap("placemark-map-2", mapConfig, "Satellite");
    map3 = new LeafletMap("placemark-map-3", mapConfig);
    map1.showZoomControl();
    map1.showLayerControl();
    map1.showCoordinatesOfMouseClick();
    map2.showZoomControl();
    map2.showLayerControl();
    map2.showCoordinatesOfMouseClick();
    map3.showZoomControl();
    map3.showLayerControl();
    map3.showCoordinatesOfMouseClick();

    let type;
    if (location.type === "attraction") {
      type = "Attractions";
    } else if (location.type === "hotel") {
      type = "Hotels";
    } else if (location.type === "restaurant") {
      type = "Restaurants";
    }

    map1.addMarker(
      { lat: location.lat, lng: location.lng },
      location.name,
      type,
      $storeTypeMap.type,
      location._id
    );
    map2.addMarker(
      { lat: location.lat, lng: location.lng },
      location.name,
      type,
      $storeTypeMap.type,
      location._id
    );
    map3.addMarker(
      { lat: location.lat, lng: location.lng },
      location.name,
      type,
      $storeTypeMap.type,
      location._id
    );
  });
</script>

<div class="columns" style="margin-top: 60px; margin-bottom: 12px; z-index: 1;">
  <div
    class="box column"
    id="placemark-map-1"
    style=" height: 320px; margin-left: 20px;"
  />

  {#if location}
    <div
      class="box column"
      style=" height:320px; margin-left: 20px; overflow: auto;"
    >
      <div class="content" style="">
        <h1>{location.name}</h1>
        <p>
          {location.address}
        </p>
        <h2>Description</h2>
        <p>
          {location.description}
        </p>
        <strong>Coordinates:</strong>
        <ul>
          <li><strong>Latitude: </strong>{location.lat}</li>
          <li><strong>Longitude: </strong>{location.lng}</li>
        </ul>
        <strong>Location Type:</strong>
        {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
      </div>
    </div>
  {/if}
</div>
<div class="columns">
  <div
    class="box column"
    id="placemark-map-2"
    style=" height:320px; margin-left: 20px;"
  />
  <div
    class="box column"
    id="placemark-map-3"
    style=" height:320px; margin-left: 20px;"
  />
</div>

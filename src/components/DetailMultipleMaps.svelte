<script>
  import "leaflet/dist/leaflet.css";
  import { LeafletMap } from "../services/map-service.js";
  import { getContext, onMount } from "svelte";
  import { storeTypeMap } from "../stores.js";

  const placemarkService = getContext("PlacemarkService");
  let location = {};
  let descriptionArray = [];

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

    descriptionArray = location.description.split("\n");

    console.log(location);

    mapConfig.location.lat = location.lat;
    mapConfig.location.lng = location.lng;
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

<div class="columns columns1">
  <div class="box column" id="placemark-map-1" />

  {#if location}
    <div
      class="box column"
      style=" height:320px; margin-left: 20px; overflow: auto;"
    >
      <div class="content">
        <h1>{location.name}</h1>
        <p>
          {location.address}
        </p>
        <h3>Description</h3>
        {#if descriptionArray.length > 1}
          <ul>
            {#each descriptionArray as value}
              <li>
                {value}
              </li>
            {/each}
          </ul>
        {:else}
          <p>
            {descriptionArray[0]}
          </p>
        {/if}
        <strong>Coordinates:</strong>
        <ul>
          <li><strong>Latitude: </strong>{location.lat}</li>
          <li><strong>Longitude: </strong>{location.lng}</li>
        </ul>
        <strong>Location type: </strong>
        {location.type}
      </div>
    </div>
  {/if}
</div>
<div class="columns">
  <div class="box column" id="placemark-map-2" />
  <div class="box column" id="placemark-map-3" />
</div>

<style>
  .columns1 {
    margin-top: 60px;
    margin-bottom: 12px;
    z-index: 1;
  }
  #placemark-map-1,
  #placemark-map-2,
  #placemark-map-3 {
    height: 320px;
    margin-left: 20px;
  }
</style>

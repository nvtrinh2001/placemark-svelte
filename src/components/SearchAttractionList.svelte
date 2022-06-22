<script>
  import { getContext } from "svelte";
  import { location } from "../stores.js";
  import noImageFound from "../assets/image_not_available.png";

  const attractionService = getContext("AttractionService");
  let citySearchedByName;
  let cityName = "";
  let attractionSearchedByCity;
  let attractionArray = [];
  let attractionLocationArray = [];
  let attractionPropertiesArray = [];
  let tagsArray = [];

  async function inputHandler() {
    citySearchedByName = await attractionService.getLocations(cityName);

    attractionSearchedByCity = await attractionService.getAttractions(
      citySearchedByName.lat,
      citySearchedByName.lon
    );

    attractionArray = attractionSearchedByCity.features;

    for (let i = 0; i < attractionArray.length; i++) {
      attractionPropertiesArray[i] =
        await attractionService.getAttractionProperties(
          attractionArray[i].properties.xid
        );
    }

    attractionLocationArray = attractionArray.map((value) => {
      return {
        name: value.properties.name,
        lat: value.geometry.coordinates[1],
        lng: value.geometry.coordinates[0],
      };
    });

    tagsArray = attractionPropertiesArray.map((value) => {
      return value.kinds.split(",");
    });

    for (let i = 0; i < attractionPropertiesArray.length; i++) {
      attractionPropertiesArray[i].tags = tagsArray[i];
    }

    location.set({
      lat: citySearchedByName.lat,
      lng: citySearchedByName.lon,
      location_array: attractionLocationArray,
      type: "attraction",
    });
  }
</script>

<div class="" style="padding: 0 0 6px 8px;">
  <!-- <h1 class="subtitle is-4">Restaurants, Hotels and Attractions around you</h1> -->

  <div class="item-container">
    <form class="" on:submit|preventDefault={inputHandler}>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input
            class="input is-small is-rounded is-info"
            type="text"
            placeholder="City name"
            bind:value={cityName}
          />
          <span class="icon is-left">
            <i class="fas fa-search" aria-hidden="true" />
          </span>
        </p>
        <button
          class="button is-link is-small is-rounded"
          style="margin-left: 8px; margin-right: 12px;">Search</button
        >
      </div>
    </form>
    <div class="" style=" max-height: 520px; overflow: auto;">
      {#each attractionPropertiesArray as attraction}
        <div class="panel-block box">
          <div class="">
            {#if attraction.preview && attraction.preview.source}
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src={attraction.preview.source} alt={attraction.name} />
                </figure>
              </div>
            {:else}
              <div class="no-img-avail">
                <figure class="image is-4by3">
                  <img src={noImageFound} alt={attraction.name} />
                </figure>
              </div>
            {/if}

            <div class="panel-block" style="padding-left: 0px;">
              <div class="subTitle">
                {attraction.name}
              </div>
            </div>

            <div class="" style="padding: 6px 0;">
              {#if attraction.tags}
                {#each attraction.tags as tag}
                  <div
                    class="button is-light is-small is-rounded"
                    style="margin: 5px 10px 5px 0; cursor: default;"
                  >
                    {tag}
                  </div>
                {/each}
              {/if}
            </div>

            <div class="" style="padding: 6px 0;">
              <div
                class="address"
                style="display: flex; justify-content: space-between; align-items: center;"
              >
                <div class="" style="font-size: 14px;">
                  <i class="fas fa-map-marker-alt" style="color: #3e8ed0;" />
                </div>
                <div
                  class="address-item"
                  style="text-align:right; font-size: 14px;"
                >
                  {#if attraction.address.house}
                    {attraction.address.house},
                  {/if}
                  {#if attraction.address.road}
                    {attraction.address.road},
                  {/if}
                  {#if attraction.address.city}
                    {attraction.address.city},
                  {/if}
                  {#if attraction.address.state}
                    {attraction.address.state},
                  {/if}
                  {#if attraction.address.country}
                    {attraction.address.country}
                  {/if}
                </div>
              </div>
            </div>

            <div class="" style="padding: 6px 0;">
              {#if attraction.wikipedia}
                <a href={attraction.wikipedia} class="button is-small is-info"
                  >WIKIPEDIA</a
                >
              {/if}
              {#if attraction.web_url}
                <a href={attraction.web_url} class="button is-small is-light"
                  >TRIP ADVISOR</a
                >
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

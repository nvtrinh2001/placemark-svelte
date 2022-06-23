<script>
  import { getContext, onMount } from "svelte";
  import { location, updatedLocationId } from "../stores.js";

  const placemarkService = getContext("PlacemarkService");
  let restaurantList = [];
  let restaurantLocationArray = [];

  onMount(async () => {
    restaurantList = await placemarkService.getLondonRestaurantLocations();

    restaurantLocationArray = restaurantList.map((value) => {
      return {
        name: value.name,
        lat: value.lat,
        lng: value.lng,
      };
    });

    location.set({
      lat: restaurantLocationArray[0].lat,
      lng: restaurantLocationArray[0].lng,
      location_array: restaurantLocationArray,
      type: "restaurant",
    });
  });

  async function prepHandler(event) {
    const locationId = event.target.id;
    updatedLocationId.set({ id: locationId });
    console.log($updatedLocationId);
  }
</script>

<div class="list-container">
  {#if restaurantList.length !== 0}
    {#each restaurantList as restaurant}
      <div class="box" style="padding-top: 10px;">
        <div class="card-image">
          <figure class="image is-4by3">
            <img
              src={restaurant.images.first}
              alt={restaurant.name}
              style="object-fit: contain;"
            />
          </figure>
        </div>
        <div class="panel-block" style="padding-left: 0px;">
          <a href="#/details/{restaurant._id}" class="subTitle">
            {restaurant.name}
          </a>
        </div>

        <div class="address">
          <div class="address-subtitle">
            <i class="fas fa-map-marker-alt" style="color: #3e8ed0;" />
            <p style="margin-left: 6px;">Address</p>
          </div>
          <div class="address-item">
            {restaurant.address}
          </div>
        </div>

        <div class="button-wrapper">
          <div class="button1">
            <a
              class="button is-small is-danger is-rounded"
              style="margin-top: 6px;"
              id={restaurant._id}
              on:click={(event) => prepHandler(event)}
              href="/#/discovery/remove">Remove</a
            >
          </div>
          <div class="button2">
            <a
              class="button is-small is-link is-rounded"
              style="margin-top: 6px;"
              id={restaurant._id}
              on:click={(event) => prepHandler(event)}
              href="/#/discovery/update">Update</a
            >
          </div>
        </div>
      </div>
    {/each}
  {:else}
    <img
      src="https://i.pinimg.com/originals/44/8b/70/448b7040d44cfc0a620c03c63df26680.png"
      alt=""
    />
  {/if}
</div>

<style>
  .list-container {
    max-height: 560px;
    overflow: auto;
  }
  .address {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
  }
  .address-subtitle {
    font-size: 14px;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .address-item {
    text-align: right;
    font-size: 14px;
  }
  .button-wrapper {
    padding: 6px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .button1 {
    font-size: 14px;
    color: #3e8ed0;
  }
  .button2 {
    text-align: right;
    font-size: 14px;
  }
</style>

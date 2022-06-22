<script>
  import { getContext } from "svelte";
  import { location } from "../stores.js";
  import noImageFound from "../assets/image_not_available.png";

  const restaurantService = getContext("RestaurantService");
  let locationSearchedByCityName;
  let cityName = "";
  let cityArray = [];
  let cityId = 187791;
  let cityLocation = {
    lat: "",
    lng: "",
  };
  let restaurantSearchedByLocationId;
  let restaurantArray = [];
  let restaurantLocationArray = [];

  async function inputHandler() {
    locationSearchedByCityName = await restaurantService.getLocations(cityName);
    cityArray = locationSearchedByCityName.results.data;
    cityId = cityArray[0].result_object.location_id;
    cityLocation = {
      lat: cityArray[0].result_object.latitude,
      lng: cityArray[0].result_object.longitude,
    };

    restaurantSearchedByLocationId = await restaurantService.getRestaurants(
      cityId
    );
    restaurantArray = restaurantSearchedByLocationId.results.data;

    restaurantLocationArray = restaurantArray.map((value) => {
      return {
        name: value.name,
        lat: value.latitude,
        lng: value.longitude,
      };
    });

    location.set({
      lat: cityLocation.lat,
      lng: cityLocation.lng,
      location_array: restaurantLocationArray,
      type: "restaurant",
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
      {#each restaurantArray as restaurant}
        <div class="panel-block box">
          <div class="">
            <div class="card-image">
              <figure class="image is-4by3">
                {#if restaurant.photo && restaurant.photo.images && restaurant.photo.images.original && restaurant.photo.images.original.url}
                  <img
                    src={restaurant.photo.images.original.url}
                    alt={restaurant.name}
                  />
                {:else}
                  <img src={noImageFound} alt={restaurant.name} />
                {/if}
              </figure>
            </div>

            <div class="panel-block" style="padding-left: 0px;">
              <div class="subTitle">
                {restaurant.name}
              </div>
            </div>
            <div class="" style="padding: 6px 0px;">
              <div
                class="rate-star"
                style="display: flex; justify-content: space-between; align-items: center;"
              >
                <div class="" style="">
                  {#each Array(Math.round(restaurant.rating)) as _, star}
                    <i
                      class="fas fa-lg fa-solid fa-star"
                      style="color: orange; padding: 0 4px 0 0;font-size: 14px;"
                    />
                  {/each}
                </div>
                <div
                  class="num-reviews"
                  style="text-align:right; font-size: 14px; margin-top: 2px;"
                >
                  {restaurant.num_reviews} reviews
                </div>
              </div>
            </div>
            <div class="" style="padding: 6px 0;">
              <div
                class="price"
                style="display: flex; justify-content: space-between; align-items: center;"
              >
                <div class="" style="font-size: 14px;">Price</div>
                <div
                  class="price-rate"
                  style="text-align:right; font-size: 14px;"
                >
                  {restaurant.price}
                </div>
              </div>
            </div>
            <div class="" style="padding: 6px 0;">
              <div
                class="ranking"
                style="display: flex; justify-content: space-between; align-items: center;"
              >
                <div class="" style="font-size: 14px;">Ranking</div>
                <div
                  class="ranking-score"
                  style="text-align:right; font-size: 14px;"
                >
                  {restaurant.ranking}
                </div>
              </div>
            </div>
            <div class="" style="padding: 6px 0;">
              {#if restaurant.awards}
                {#each restaurant.awards as award}
                  <div
                    class="certificate"
                    style="display: flex; justify-content: space-between; align-items: center;"
                  >
                    <div class="" style="font-size: 14px;">
                      <i class="fas fa-trophy" style="color: lightblue;" />
                    </div>
                    <div
                      class="certificate-list"
                      style="text-align:right; font-size: 14px;"
                    >
                      {award.display_name}
                    </div>
                  </div>
                {/each}
              {/if}
            </div>
            <div class="" style="padding: 6px 0;">
              {#if restaurant.cuisine}
                {#each restaurant.cuisine as tag}
                  <div
                    class="button is-light is-small is-rounded"
                    style="margin: 5px 10px 5px 0; cursor: default;"
                  >
                    {tag.name}
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
                  {restaurant.address}
                </div>
              </div>
            </div>
            {#if restaurant.phone}
              <div class="" style="padding: 6px 0;">
                <div
                  class="phone"
                  style="display: flex; justify-content: space-between; align-items: center;"
                >
                  <div class="" style="font-size: 14px;">
                    <i class="fas fa-phone-alt" style="color: #3e8ed0;" />
                  </div>
                  <div
                    class="phone-item"
                    style="text-align:right; font-size: 14px;"
                  >
                    {restaurant.phone}
                  </div>
                </div>
              </div>
            {/if}
            <div class="" style="padding: 6px 0;">
              {#if restaurant.website}
                <a href={restaurant.website} class="button is-small is-light"
                  >WEBSITE</a
                >
              {/if}
              {#if restaurant.web_url}
                <a href={restaurant.web_url} class="button is-small is-light"
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

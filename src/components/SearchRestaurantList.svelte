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
    locationSearchedByCityName = [];
    cityArray = [];
    restaurantSearchedByLocationId;
    restaurantArray = [];
    restaurantLocationArray = [];

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

<div class="item-container">
  <form on:submit|preventDefault={inputHandler}>
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
      <button class="button search is-link is-small is-rounded">Search</button>
    </div>
  </form>

  <div class="search-results">
    {#each restaurantArray as restaurant}
      <div class="panel-block box">
        <div>
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

          <div class="rate-star">
            <div>
              {#each Array(Math.round(restaurant.rating)) as _, star}
                <i class="fas fa-lg fa-solid fa-star star-icons" />
              {/each}
            </div>
            <div class="num-reviews">
              {restaurant.num_reviews} reviews
            </div>
          </div>

          <div class="price">
            <div style="font-size: 14px;">Price</div>
            <div class="price-rate" style="text-align: right; font-size: 14px;">
              {restaurant.price}
            </div>
          </div>

          <div class="ranking">
            <div style="font-size: 14px;">Ranking</div>
            <div class="ranking-score">
              {restaurant.ranking}
            </div>
          </div>

          <div style="padding: 6px 0;">
            {#if restaurant.awards}
              {#each restaurant.awards as award}
                <div class="certificate">
                  <div style="font-size: 14px;">
                    <i class="fas fa-trophy" style="color: lightblue;" />
                  </div>
                  <div class="certificate-list">
                    {award.display_name}
                  </div>
                </div>
              {/each}
            {/if}
          </div>

          <div style="padding: 6px 0;">
            {#if restaurant.cuisine}
              {#each restaurant.cuisine as tag}
                <div class="button tag is-light is-small is-rounded">
                  {tag.name}
                </div>
              {/each}
            {/if}
          </div>

          <div class="address">
            <div class="" style="font-size: 14px;">
              <i class="fas fa-map-marker-alt" style="color: #3e8ed0;" />
            </div>
            <div class="address-item">
              {restaurant.address}
            </div>
          </div>

          {#if restaurant.phone}
            <div class="phone">
              <div class="" style="font-size: 14px;">
                <i class="fas fa-phone-alt" style="color: #3e8ed0;" />
              </div>
              <div class="phone-item">
                {restaurant.phone}
              </div>
            </div>
          {/if}

          <div style="padding: 6px 0;">
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

    {#if restaurantArray.length === 0}
      <div class="no-img-avail">
        <figure class="image is-4by3">
          <img
            src="https://i.pinimg.com/originals/44/8b/70/448b7040d44cfc0a620c03c63df26680.png"
            alt=""
          />
        </figure>
        <p class="note">Start searching or try another city..</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .item-container {
    padding: 0 0 6px 8px;
  }
  .button.search {
    margin-left: 8px;
    margin-right: 12px;
  }
  .search-results {
    max-height: 520px;
    overflow: auto;
  }
  .rate-star,
  .price,
  .address,
  .ranking,
  .phone {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0px;
  }
  .star-icons {
    color: orange;
    padding: 0 4px 0 0;
    font-size: 14px;
  }
  .num-reviews {
    text-align: right;
    font-size: 14px;
    margin-top: 2px;
  }
  .price-rate,
  .ranking-score,
  .certificate-list,
  .address-item,
  .phone-item {
    text-align: right;
    font-size: 14px;
  }
  .certificate {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .button.tag {
    margin: 5px 10px 5px 0;
    cursor: default;
  }

  .note {
    text-align: center;
    color: #ccc;
    margin: 4px;
  }
</style>

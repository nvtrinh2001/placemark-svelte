<script>
  import { getContext } from "svelte";
  import { location } from "../stores.js";
  import noImageFound from "../assets/image_not_available.png";

  const hotelService = getContext("HotelService");
  let locationSearchedByCityName;
  let cityArray = [];
  let cityId = 187791;
  let cityLocation = {
    lat: "",
    lng: "",
  };
  let hotelSearchedByLocationId;

  let cityName = "";
  let checkinDate = "";
  let checkoutDate = "";
  let numberAdult;
  let nums = [1, 2, 3, 4, 5, 6, 7];
  let hotelArray = [];
  let hotelLocationArray = [];

  async function inputHandler() {
    locationSearchedByCityName = [];
    cityArray = [];
    hotelArray = [];
    hotelLocationArray = [];

    locationSearchedByCityName = await hotelService.getLocations(cityName);
    cityArray = locationSearchedByCityName.suggestions[0].entities;
    cityId = cityArray[0].destinationId;
    cityLocation = {
      lat: cityArray[0].latitude.toString(),
      lng: cityArray[0].longitude.toString(),
    };

    hotelSearchedByLocationId = await hotelService.getHotels(
      checkinDate,
      checkoutDate,
      cityId,
      numberAdult
    );

    hotelArray = hotelSearchedByLocationId.searchResults.results;

    hotelLocationArray = hotelArray.map((value) => {
      return {
        name: value.name,
        lat: value.coordinate.lat,
        lng: value.coordinate.lon,
      };
    });

    location.set({
      lat: cityLocation.lat,
      lng: cityLocation.lng,
      location_array: hotelLocationArray,
      type: "hotel",
    });
  }
</script>

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
    </div>

    <div class="panel-block option-container">
      <p class="control has-icons-left">
        <input
          class="input is-small is-rounded is-info"
          type="date"
          style="color: #aaa;"
          bind:value={checkinDate}
        />
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true" />
        </span>
      </p>

      <p class="control has-icons-left" style="margin: 0 8px;">
        <input
          class="input is-small is-rounded is-info"
          type="date"
          style="color: #aaa;"
          bind:value={checkoutDate}
        />
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true" />
        </span>
      </p>

      <div class="control has-icons-left">
        <div class="select is-small is-rounded">
          <select bind:value={numberAdult}>
            {#each nums as num}
              <option>{num}</option>
            {/each}
          </select>
        </div>
        <span class="icon is-left">
          <i class="fas fa-globe" />
        </span>
      </div>
    </div>

    <button class="button search is-link is-small is-rounded">Search</button>
  </form>

  <div class="search-results">
    {#each hotelArray as hotel}
      <div class="panel-block box">
        <div>
          {#if hotel.optimizedThumbUrls && hotel.optimizedThumbUrls.srpDesktop}
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  src={hotel.optimizedThumbUrls.srpDesktop}
                  alt={hotel.name}
                />
              </figure>
            </div>
          {:else}
            <div class="no-img-avail">
              <figure class="image is-4by3">
                <img src={noImageFound} alt={hotel.name} />
              </figure>
            </div>
          {/if}

          <div class="panel-block" style="padding-left: 0px;">
            <div class="subTitle">
              {hotel.name}
            </div>
          </div>

          {#if hotel.guestReviews}
            <div class="rate-star">
              <div>
                {#if hotel.guestReviews.unformattedRating}
                  {#each Array(Math.round(hotel.guestReviews.unformattedRating)) as _, star}
                    <i class="fas fa-lg fa-solid fa-star star-icons" />
                  {/each}
                {/if}
              </div>
              {#if hotel.guestReviews.total}
                <div class="num-reviews">
                  {hotel.guestReviews.total} reviews
                </div>
              {/if}
            </div>
          {/if}

          <div class="price">
            <div style="font-size: 14px;">Price</div>
            <div class="price-rate">
              {hotel.ratePlan.price.current}: {hotel.ratePlan.price.info}
            </div>
          </div>

          <div style="padding: 6px 0;">
            {#if hotel.landmarks}
              {#each hotel.landmarks as landmark}
                <div class="button landmark is-light is-small is-rounded">
                  {landmark.label}: {landmark.distance}
                </div>
              {/each}
            {/if}
          </div>

          <div class="address">
            <div class="" style="font-size: 14px;">
              <i class="fas fa-map-marker-alt" style="color: #3e8ed0;" />
            </div>
            <div class="address-item">
              {hotel.address.streetAddress}, {hotel.address.locality}, {hotel
                .address.region}, {hotel.address.countryName}
            </div>
          </div>

          <div style="padding: 6px 0;">
            {#if hotel.urls !== {}}
              <a href={hotel.urls} class="button is-small is-light">WEBSITE</a>
            {/if}
          </div>
        </div>
      </div>
    {/each}

    {#if hotelArray.length === 0}
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
  .option-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .button.search {
    margin: 6px 12px 8px;
  }
  .search-results {
    max-height: 520px;
    overflow: auto;
  }
  .rate-star,
  .price,
  .address {
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
  .price-rate {
    text-align: right;
    font-size: 14px;
  }
  .button.landmark {
    margin: 5px 10px 5px 0;
    cursor: default;
  }

  .address-item {
    text-align: right;
    font-size: 14px;
  }
  .note {
    text-align: center;
    color: #ccc;
    margin: 4px;
  }
</style>

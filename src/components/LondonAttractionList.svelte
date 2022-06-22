<script>
  import { getContext, onMount } from "svelte";
  import { location, updatedLocationId } from "../stores.js";

  const placemarkService = getContext("PlacemarkService");
  let attractionList = [];
  let attractionLocationArray = [];

  onMount(async () => {
    attractionList = await placemarkService.getLondonAttractionLocations();

    attractionLocationArray = attractionList.map((value) => {
      return {
        name: value.name,
        lat: value.lat,
        lng: value.lng,
      };
    });

    location.set({
      lat: attractionLocationArray[0].lat,
      lng: attractionLocationArray[0].lng,
      location_array: attractionLocationArray,
      type: "attraction",
    });
  });

  async function prepHandler(event) {
    const locationId = event.target.id;
    updatedLocationId.set({ id: locationId });
    console.log($updatedLocationId);
  }
</script>

<div class="" style=" max-height: 560px; overflow: auto;">
  {#if attractionList.length !== 0}
    {#each attractionList as attraction}
      <div class="box" style="padding-top: 10px;">
        <div class="">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src={attraction.images.first}
                alt={attraction.name}
                style="object-fit: contain;"
              />
            </figure>
          </div>
          <div class="panel-block" style="padding-left: 0px;">
            <a href="#/details/{attraction._id}" class="subTitle">
              {attraction.name}
            </a>
          </div>

          <div class="" style="padding: 6px 0;">
            <div
              class="address"
              style="display: flex; justify-content: space-between; align-items: center;"
            >
              <div
                class=""
                style="font-size: 14px; display: flex; justify-content: left; align-items: center;"
              >
                <i class="fas fa-map-marker-alt" style="color: #3e8ed0;" />
                <p style="margin-left: 6px;">Address</p>
              </div>
              <div
                class="address-item"
                style="text-align:right; font-size: 14px;"
              >
                {attraction.address}
              </div>
            </div>
          </div>

          <div class="" style="padding: 6px 0;">
            <div
              class="button-wrapper"
              style="display: flex; justify-content: space-between; align-items: center;"
            >
              <div class="" style="font-size: 14px;color: #3e8ed0;">
                <a
                  class="button is-small is-danger is-rounded"
                  style="margin-top: 6px;"
                  id={attraction._id}
                  on:click={(event) => prepHandler(event)}
                  href="/#/discovery/remove">Remove</a
                >
              </div>
              <div class="" style="text-align:right; font-size: 14px;">
                <a
                  class="button is-small is-link is-rounded"
                  style="margin-top: 6px;"
                  id={attraction._id}
                  on:click={(event) => prepHandler(event)}
                  href="/#/discovery/update">Update</a
                >
              </div>
            </div>
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

<script>
  import { pop } from "svelte-spa-router";
  import { getContext, onMount } from "svelte";
  import { location, addNewLocation } from "../stores.js";

  const placemarkService = getContext("PlacemarkService");
  const reverseGeocodingService = getContext("ReverseGeocodingService");

  let locationName,
    locationAddress,
    locationDescription,
    locationImage =
      "https://www.data-modul.com/sites/default/files/no-image.png";
  let returnedValue;

  // Modal
  // Function to close the modal
  function closeModal() {
    pop();
  }

  async function closeHandler() {
    closeModal();
  }

  onMount(async () => {
    returnedValue = await reverseGeocodingService.getLocation(
      $addNewLocation.lat,
      $addNewLocation.lng
    );
    locationAddress = returnedValue.display_name;
  });

  // Add handler
  async function addFavoriteHandler() {
    const data = {
      name: locationName,
      address: locationAddress,
      lat: $addNewLocation.lat,
      lng: $addNewLocation.lng,
      description: locationDescription,
      images: {
        first: locationImage,
        second: "",
      },
      type: $location.type,
    };

    await placemarkService.addNewLondonLocation(data);
    pop();

    console.log(data);
  }
</script>

<!-- Modal HTML content(hidden by default) starts here -->
<div class="container">
  <div class="modal is-active" id="modal1" style="z-index: 101;">
    <div class="modal-background" on:click={closeHandler} />
    <button
      class="delete"
      aria-label="close"
      on:click={closeHandler}
      style="color: #fff; top: 42px; right: -290px; z-index: 102;"
    />
    <form class="modal-card" on:submit|preventDefault={addFavoriteHandler}>
      <header class="modal-card-head" style="background-color: #3e8ed0;">
        <p class="modal-card-title" style="font-weight: 500; color: #fff;">
          Add a new London location
        </p>
      </header>
      <div class="modal-card-body">
        <div class="">
          <div class="field">
            <p style="font-size: 16px; color: #3e8ed0; padding: 4px 10px;">
              Name
            </p>
            <p class="control has-icons-left">
              <input
                class="input is-rounded "
                type="text"
                name="name"
                placeholder="location name"
                bind:value={locationName}
              />
              <span class="icon is-small is-left">
                <i class="fas fa-keyboard" />
              </span>
            </p>
          </div>
          <div class="field">
            <p style="font-size: 16px; color: #3e8ed0; padding: 4px 10px;">
              Address
            </p>
            <p class="control has-icons-left">
              <input
                class="input is-rounded "
                type="text"
                name="address"
                placeholder="location address"
                bind:value={locationAddress}
                disabled
              />
              <span class="icon is-small is-left">
                <i class="fas fa-keyboard" />
              </span>
            </p>
          </div>
          <div class="field">
            <p style="font-size: 16px; color: #3e8ed0; padding: 4px 10px;">
              Latitude
            </p>
            <p class="control has-icons-left">
              <input
                class="input is-rounded "
                type="text"
                name="lat"
                placeholder="Location lat"
                bind:value={$addNewLocation.lat}
                disabled
              />
              <span class="icon is-small is-left">
                <i class="fas fa-keyboard" />
              </span>
            </p>
          </div>
          <div class="field">
            <p style="font-size: 16px; color: #3e8ed0; padding: 4px 10px;">
              Longitude
            </p>
            <p class="control has-icons-left">
              <input
                class="input is-rounded "
                type="text"
                name="lng"
                placeholder="Location lng"
                bind:value={$addNewLocation.lng}
                disabled
              />
              <span class="icon is-small is-left">
                <i class="fas fa-keyboard" />
              </span>
            </p>
          </div>
          <div class="field">
            <p style="font-size: 16px; color: #3e8ed0; padding: 4px 10px;">
              Description
            </p>
            <p class="control has-icons-left">
              <input
                class="input is-rounded "
                type="text"
                name="description"
                placeholder="location description"
                bind:value={locationDescription}
              />
              <span class="icon is-small is-left">
                <i class="fas fa-keyboard" />
              </span>
            </p>
          </div>
          <div class="field">
            <p style="font-size: 16px; color: #3e8ed0; padding: 4px 10px;">
              Image
            </p>
            <p class="control has-icons-left">
              <input
                class="input is-rounded "
                type="text"
                name="image"
                placeholder="location image"
                bind:value={locationImage}
              />
              <span class="icon is-small is-left">
                <i class="fas fa-keyboard" />
              </span>
            </p>
          </div>
          <div class="field">
            <p style="font-size: 16px; color: #3e8ed0; padding: 4px 10px;">
              Type
            </p>
            <div class="control has-icons-left">
              <div class="select is-rounded ">
                <!-- <select bind:value={selectedChoice}> -->
                <!-- <select bind:value={selectedChoice} on:change={onChangeHandler}> -->
                <select name="type" bind:value={$location.type}>
                  <option>attraction</option>
                  <option>hotel</option>
                  <option>restaurant</option>
                </select>
              </div>
              <span class="icon is-left">
                <i class="fas fa-globe" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-card-foot">
        <button type="submit" class="button is-link"> Add </button>
      </div>
    </form>
  </div>
</div>

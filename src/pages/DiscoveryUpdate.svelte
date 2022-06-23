<script>
  import { pop } from "svelte-spa-router";
  import { getContext, onMount } from "svelte";
  import { updatedLocationId } from "../stores.js";

  const placemarkService = getContext("PlacemarkService");

  let locationName = "Placeholder Name",
    locationAddress = "",
    locationLat = "",
    locationLng = "",
    locationDescription = "Placeholder Description",
    locationImage = "",
    updatedType = "";
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
    returnedValue = await placemarkService.getLondonLocationById(
      $updatedLocationId.id
    );
    locationName = returnedValue.name;
    locationAddress = returnedValue.address;
    locationLat = returnedValue.lat;
    locationLng = returnedValue.lng;
    locationDescription = returnedValue.description;
    locationImage = returnedValue.images.first;
    if (returnedValue.images.second !== "") {
      returnedValue.images.first = returnedValue.images.second;
    }
    updatedType = returnedValue.type;
  });

  // Add handler
  async function updateFavoriteHandler(e) {
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    const modifiedData = {
      name: data.name,
      address: data.address,
      lat: data.lat,
      lng: data.lng,
      description: data.description,
      images: {
        first: returnedValue.images.first,
        second: locationImage,
      },
      type: data.type,
    };

    await placemarkService.updateLondonLocationById(
      $updatedLocationId.id,
      modifiedData
    );
    pop();

    console.log(data);
  }
</script>

<div class="container">
  <div class="modal is-active" style="z-index: 101;">
    <div class="modal-background" on:click={closeHandler} />
    <button class="delete del-btn" aria-label="close" on:click={closeHandler} />
    <form
      class="modal-card"
      on:submit|preventDefault={(e) => updateFavoriteHandler(e)}
    >
      <header class="modal-card-head modal-header">
        <p class="modal-card-title modal-heading">Update a London location</p>
      </header>
      <div class="modal-card-body">
        <div class="field">
          <p class="fieldTitle">Name</p>
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
          <p class="fieldTitle">Address</p>
          <p class="control has-icons-left">
            <input
              class="input is-rounded "
              type="text"
              name="address"
              placeholder="location address"
              bind:value={locationAddress}
            />
            <span class="icon is-small is-left">
              <i class="fas fa-keyboard" />
            </span>
          </p>
        </div>
        <div class="field">
          <p class="fieldTitle">Latitude</p>
          <p class="control has-icons-left">
            <input
              class="input is-rounded "
              type="text"
              name="lat"
              placeholder="Location lat"
              bind:value={locationLat}
            />
            <span class="icon is-small is-left">
              <i class="fas fa-keyboard" />
            </span>
          </p>
        </div>
        <div class="field">
          <p class="fieldTitle">Longitude</p>
          <p class="control has-icons-left">
            <input
              class="input is-rounded "
              type="text"
              name="lng"
              placeholder="Location lng"
              bind:value={locationLng}
            />
            <span class="icon is-small is-left">
              <i class="fas fa-keyboard" />
            </span>
          </p>
        </div>
        <div class="field">
          <p class="fieldTitle">Description</p>
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
          <p class="fieldTitle">Image</p>
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
          <p class="fieldTitle">Type</p>
          <div class="control has-icons-left">
            <div class="select is-rounded ">
              <select name="type" bind:value={updatedType}>
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
      <div class="modal-card-foot">
        <button type="submit" class="button is-link"> Update </button>
      </div>
    </form>
  </div>
</div>

<style>
  .del-btn {
    color: #fff;
    top: 42px;
    right: -290px;
    z-index: 102;
  }
  .modal-header {
    background-color: #3e8ed0;
  }
  .modal-heading {
    font-weight: 500;
    color: #fff;
  }
  .fieldTitle {
    font-size: 16px;
    color: #3e8ed0;
    padding: 4px 10px;
  }
</style>

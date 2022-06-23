<script>
  import { pop } from "svelte-spa-router";
  import { getContext, onMount } from "svelte";
  import { updatedLocationId } from "../stores.js";

  const placemarkService = getContext("PlacemarkService");

  let locationName;
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
    returnedValue = await placemarkService.getLocationById(
      $updatedLocationId.id
    );
    locationName = returnedValue.name;
  });

  // Add handler
  async function removeFavoriteHandler(e) {
    const success = await placemarkService.deleteLocationById(
      $updatedLocationId.id
    );
    if (success) {
      pop();
    }
  }
</script>

<div class="container">
  <div class="modal is-active" style="z-index: 101;">
    <div class="modal-background" on:click={closeHandler} />
    <button class="delete del-btn" aria-label="close" on:click={closeHandler} />
    <form
      class="modal-card"
      on:submit|preventDefault={(e) => removeFavoriteHandler(e)}
    >
      <header class="modal-card-head modal-header">
        <p class="modal-card-title modal-heading">Remove your location</p>
      </header>
      <div class="modal-card-body">
        <div>
          <p class="field">
            Travisor will remove "{locationName}" from your Favorite.
          </p>
          <p>Are you sure?</p>
        </div>
      </div>
      <div class="modal-card-foot">
        <button type="submit" class="button is-danger"> Remove </button>
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
</style>

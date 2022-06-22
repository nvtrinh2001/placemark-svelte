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
    returnedValue = await placemarkService.getLondonLocationById(
      $updatedLocationId.id
    );
    locationName = returnedValue.name;
  });

  // Add handler
  async function removeFavoriteHandler(e) {
    const success = await placemarkService.deleteLondonLocationById(
      $updatedLocationId.id
    );
    if (success) {
      pop();
    }
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
    <form
      class="modal-card"
      on:submit|preventDefault={(e) => removeFavoriteHandler(e)}
    >
      <header class="modal-card-head" style="background-color: #3e8ed0;">
        <p class="modal-card-title" style="font-weight: 500; color: #fff;">
          Remove your location
        </p>
      </header>
      <div class="modal-card-body">
        <div class="">
          <p class="field">
            Travisor will remove "{locationName}" from London Discovery.
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

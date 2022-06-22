<script>
  import Gallery from "svelte-image-gallery";
  import { getContext, onMount } from "svelte";

  export let type = "";

  const placemarkService = getContext("PlacemarkService");
  let returnedValue = [];

  onMount(async () => {
    if (type === "discovery") {
      returnedValue = await placemarkService.getLondonHotelLocations();
    } else if (type === "favorite") {
      returnedValue = await placemarkService.getAllHotelLocations();
    }
  });
</script>

{#if returnedValue.length !== 0}
  <Gallery gap="10" maxColumnWidth="280">
    {#each returnedValue as value}
      {#if value.image}
        <img src={value.image} alt="" />
      {:else if value.images}
        <img src={value.images.first} alt="" />
        <img src={value.images.second} alt="" />
      {/if}
    {/each}
  </Gallery>
{:else}
  <Gallery gap="10" maxColumnWidth="1000">
    <img
      src="https://i.pinimg.com/originals/44/8b/70/448b7040d44cfc0a620c03c63df26680.png"
      class="notfound"
      alt=""
    />
  </Gallery>
{/if}

<style>
  img {
    opacity: 0.9;
    transition: all 0.2s;
  }
  img:hover {
    opacity: 1;
    transform: scale(1.04);
  }
  .notfound,
  .notfound:hover {
    opacity: 1;
    transition: none;
    transform: none;
  }
</style>

<script>
  import Gallery from "svelte-image-gallery";
  import { getContext, onMount } from "svelte";
  import { storeTypeMap } from "../stores.js";

  const placemarkService = getContext("PlacemarkService");
  let returnedValue;

  onMount(async () => {
    if ($storeTypeMap.type === "discovery") {
      returnedValue = await placemarkService.getLondonLocationById(
        window.location.hash.slice(10)
      );
    } else {
      returnedValue = await placemarkService.getLocationById(
        window.location.hash.slice(10)
      );
    }

    console.log(returnedValue);
  });
</script>

<article class="panel is-info" style="margin-top: 11px;">
  <p class="panel-heading">
    Images
    {#if returnedValue}
      for {returnedValue.name}
    {/if}
  </p>
  <div class="box">
    <Gallery gap="10" maxColumnWidth="200">
      {#if returnedValue && $storeTypeMap.type === "discovery"}
        <img src={returnedValue.images.first} alt="" />
        <img src={returnedValue.images.second} alt="" />
      {:else if returnedValue && $storeTypeMap.type !== "discovery"}
        <img src={returnedValue.image} alt="" />
      {:else}
        <img
          src="https://i.pinimg.com/originals/44/8b/70/448b7040d44cfc0a620c03c63df26680.png"
          alt=""
        />
      {/if}
    </Gallery>
  </div>
</article>

<style>
  img {
    opacity: 0.9;
    transition: all 0.2s;
  }
  img:hover {
    opacity: 1;
    transform: scale(1.04);
  }
  .box {
    max-height: 560px;
    overflow: auto;
    padding-top: 10px;
  }
</style>

<script>
  import GalleryAttraction from "./GalleryAttraction.svelte";
  import GalleryHotel from "./GalleryHotel.svelte";
  import GalleryRestaurant from "./GalleryRestaurant.svelte";
  let typeLocation = "attraction";

  async function londonTypeHandler(e) {
    typeLocation = await e.target.innerText.toLowerCase();
  }
</script>

<article class="panel is-info" style="margin-top: 10px;">
  <p class="panel-heading">Your Favorite Location Images</p>
  <p class="panel-tabs">
    <button
      class="button is-small is-light is-rounded"
      style="margin: 12px;"
      on:click={londonTypeHandler}>Attraction</button
    >
    <button
      class="button is-small is-light is-rounded"
      style="margin: 12px;"
      on:click={londonTypeHandler}>Hotel</button
    >
    <button
      class="button is-small is-light is-rounded"
      style="margin: 12px;"
      on:click={londonTypeHandler}>Restaurant</button
    >
  </p>
  <div class="box">
    {#if typeLocation === "attraction"}
      <GalleryAttraction type="favorite" />
    {/if}
    {#if typeLocation === "hotel"}
      <GalleryHotel type="favorite" />
    {/if}
    {#if typeLocation === "restaurant"}
      <GalleryRestaurant type="favorite" />
    {/if}
  </div>
</article>

<style>
  .box {
    max-height: 560px;
    overflow: auto;
    padding-top: 10px;
  }
</style>

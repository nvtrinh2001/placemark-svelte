<script>
  import MainNavigator from "../components/MainNavigator.svelte";
  import DetailMultipleMaps from "../components/DetailMultipleMaps.svelte";
  import DetailImageGallery from "../components/DetailImageGallery.svelte";
</script>

<div class="columns is-vcentered">
  <div class="column">
    <MainNavigator />
  </div>
</div>

<div class="columns column-list">
  <div class="column is-4 " style=" margin-top: 50px;">
    <DetailImageGallery />
  </div>

  <div class="column is-8">
    <DetailMultipleMaps />
  </div>
</div>

<style>
  .column-list {
    margin-left: 64px;
    margin-right: 70px;
  }
</style>

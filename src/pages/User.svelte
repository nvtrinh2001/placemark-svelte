<script>
  import UserDetail from "../components/UserDetail.svelte";
  import UserGeneral from "../components/UserGeneral.svelte";
  import MainNavigator from "../components/MainNavigator.svelte";
  import FavImageGallery from "../components/FavImageGallery.svelte";
  import LondonImageGallery from "../components/LondonImageGallery.svelte";
</script>

<div class="columns is-vcentered">
  <div class="column">
    <MainNavigator />
  </div>
</div>

<div class="columns column-list">
  <div class="column is-4 " style=" margin-top: 80px;">
    <UserGeneral />
  </div>

  <div class="column is-8 " style=" margin-top: 80px;">
    <UserDetail />
    <FavImageGallery />
    <LondonImageGallery />
  </div>
</div>

<style>
  .column-list {
    margin-left: 64px;
    margin-right: 70px;
  }
</style>

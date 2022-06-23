<script>
  import MainNavigator from "../components/MainNavigator.svelte";
  import SearchPlacemarkMap from "../components/SearchPlacemarkMap.svelte";
  import SearchList from "../components/SearchList.svelte";
</script>

<div class="columns is-vcentered">
  <div class="column">
    <MainNavigator />
  </div>
</div>

<div class="columns column-list">
  <div class="column is-4 " style=" margin-top: 50px;">
    <SearchList />
  </div>

  <div class="column is-8 has-text-centered">
    <SearchPlacemarkMap />
  </div>
</div>

<style>
  .column-list {
    margin-left: 64px;
    margin-right: 70px;
  }
</style>

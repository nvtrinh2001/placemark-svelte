<script>
  let selectedChoice;
  let choiceList = ["Attractions", "Hotels", "Restaurants"];
  import AttractionList from "./SearchAttractionList.svelte";
  import HotelList from "./SearchHotelList.svelte";
  import RestaurantList from "./SearchRestaurantList.svelte";
</script>

<article class="panel is-info" style="margin-top: 11px;">
  <p class="panel-heading">{selectedChoice} around you</p>
  <div class="control has-icons-left" style="margin: 12px 0 4px 20px;">
    <div class="select is-small is-rounded ">
      <!-- <select bind:value={selectedChoice}> -->
      <select bind:value={selectedChoice}>
        {#each choiceList as choice}
          <option>{choice}</option>
        {/each}
      </select>
    </div>
    <span class="icon is-left">
      <i class="fas fa-globe" />
    </span>
  </div>
  {#if selectedChoice === "Attractions"}
    <AttractionList />
  {/if}
  {#if selectedChoice === "Hotels"}
    <HotelList />
  {/if}
  {#if selectedChoice === "Restaurants"}
    <RestaurantList />
  {/if}
</article>

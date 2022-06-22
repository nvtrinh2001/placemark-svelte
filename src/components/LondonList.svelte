<script>
  import AttractionList from "./LondonAttractionList.svelte";
  import RestaurantList from "./LondonRestaurantList.svelte";
  import HotelList from "./LondonHotelList.svelte";

  let selectedChoice;
  let choiceList = ["Attractions", "Hotels", "Restaurants"];

  // async function onChangeHandler() {
  //   push(`/favorite/${selectedChoice.toLowerCase()}`);
  // }
</script>

<article class="panel is-info" style="margin-top: 11px;">
  <p class="panel-heading">London Discovery</p>
  <div class="control has-icons-left" style="margin: 12px 0 4px 20px;">
    <div class="select is-small is-rounded ">
      <!-- <select bind:value={selectedChoice}> -->
      <!-- <select bind:value={selectedChoice} on:change={onChangeHandler}> -->
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
  {#if selectedChoice === "Restaurants"}
    <RestaurantList />
  {/if}
  {#if selectedChoice === "Hotels"}
    <HotelList />
  {/if}
</article>

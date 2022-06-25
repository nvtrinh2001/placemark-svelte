<script>
  import MainNavigator from "../components/MainNavigator.svelte";
  import ChartBar from "../components/ChartBar.svelte";
  import ChartPie from "../components/ChartPie.svelte";
  import ChartPercentage from "../components/ChartPercentage.svelte";
  import { getContext, onMount } from "svelte";

  const placemarkService = getContext("PlacemarkService");

  let londonData = {
    labels: ["Attractions", "Hotels", "Restaurants"],
    datasets: [
      {
        values: [0, 0, 0],
      },
    ],
  };
  let favData = {
    labels: ["Attractions", "Hotels", "Restaurants"],
    datasets: [
      {
        values: [0, 0, 0],
      },
    ],
  };
  let typeChartLondon = "bar";
  let typeChartFav = "bar";

  async function londonTypeChartHandler(e) {
    typeChartLondon = await e.target.innerText.toLowerCase();
  }

  async function favTypeChartHandler(e) {
    typeChartFav = await e.target.innerText.toLowerCase();
  }

  onMount(async () => {
    let londonLocationList = await placemarkService.getAllLondonLocations();
    console.log(londonLocationList);
    londonLocationList.forEach((location) => {
      if (location.type == "attraction") {
        londonData.datasets[0].values[0] += 1;
      } else if (location.type == "hotel") {
        londonData.datasets[0].values[1] += 1;
      } else {
        londonData.datasets[0].values[2] += 1;
      }
    });

    let favLocationList = await placemarkService.getAllLocations();
    favLocationList.forEach((location) => {
      if (location.type == "attraction") {
        favData.datasets[0].values[0] += 1;
      } else if (location.type == "hotel") {
        favData.datasets[0].values[1] += 1;
      } else {
        favData.datasets[0].values[2] += 1;
      }
    });
  });
</script>

<div class="columns is-vcentered">
  <div class="column">
    <MainNavigator />
  </div>
</div>

<div class="columns column-list">
  <div class="column" style=" margin-top: 100px;">
    <article class="panel is-info">
      <p class="panel-heading">London locations per type</p>
      <p class="panel-tabs">
        <button
          class="button is-small is-light is-rounded"
          style="margin: 6px;"
          on:click={londonTypeChartHandler}>Bar</button
        >
        <button
          class="button is-small is-light is-rounded"
          style="margin: 6px;"
          on:click={londonTypeChartHandler}>Pie</button
        >
        <button
          class="button is-small is-light is-rounded"
          style="margin: 6px;"
          on:click={londonTypeChartHandler}>Percentage</button
        >
      </p>
      {#if typeChartLondon === "bar"}
        <ChartBar data={londonData} />
      {/if}
      {#if typeChartLondon === "pie"}
        <ChartPie data={londonData} />
      {/if}
      {#if typeChartLondon === "percentage"}
        <ChartPercentage data={londonData} />
      {/if}
    </article>
  </div>
  <div class="column" style=" margin-top: 100px;">
    <article class="panel is-info">
      <p class="panel-heading">Favorite locations per type</p>
      <p class="panel-tabs">
        <button
          class="button is-small is-light is-rounded"
          style="margin: 6px;"
          on:click={favTypeChartHandler}>Bar</button
        >
        <button
          class="button is-small is-light is-rounded"
          style="margin: 6px;"
          on:click={favTypeChartHandler}>Pie</button
        >
        <button
          class="button is-small is-light is-rounded"
          style="margin: 6px;"
          on:click={favTypeChartHandler}>Percentage</button
        >
      </p>
      {#if typeChartFav === "bar"}
        <ChartBar data={favData} />
      {/if}
      {#if typeChartFav === "pie"}
        <ChartPie data={favData} />
      {/if}
      {#if typeChartFav === "percentage"}
        <ChartPercentage data={favData} />
      {/if}
    </article>
  </div>
</div>

<style>
  .column-list {
    margin-left: 64px;
    margin-right: 70px;
  }
</style>

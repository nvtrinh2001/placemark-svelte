<script>
  import Chart from "svelte-frappe-charts";

  export let data = {
    labels: ["Attractions", "Hotels", "Restaurants"],
    datasets: [
      {
        values: [0, 0, 0],
      },
    ],
  };
</script>

<Chart {data} type="pie" />

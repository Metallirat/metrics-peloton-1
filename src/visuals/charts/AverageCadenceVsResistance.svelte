<script>
  import LineChart from "../../components/charts/LineChart.svelte";
  import {averageResistance, averageCadence} from "../../store/store.js";
  import {getPlotPointsByDate} from "../../utils/chartUtils";

  const getDatasets = (averageCadence, averageResistance) => {
    const cadenceData = getPlotPointsByDate(
        averageCadence,
        "average",
        "createdAt",
    );
    const resistanceData = getPlotPointsByDate(
        averageResistance,
        "average",
        "createdAt",
    );

    return {
      datasets: [
        {
          borderColor: "#A9D6E5",
          label: "Average Cadence",
          data: cadenceData,
          fill: false,
          lineTension: 0,
          pointBackgroundColor: "#A9D6E5",
        },
        {
          borderColor: "#3FC1C0",
          label: "Average Resistance (%)",
          data: resistanceData,
          fill: false,
          lineTension: 0,
          pointBackgroundColor: "#3FC1C0",
        },
      ],
    };
  };

  let datasets;
  let chartReference;
  let isError = false;
  const ERROR_MESSAGE = "There was an error generating the output over time chart.";

  try {
    datasets = getDatasets($averageCadence, $averageResistance);
  } catch (e) {
    isError = true;
    console.error(ERROR_MESSAGE, e);
  }

  averageCadence.subscribe((value) => {
    try {
      if (chartReference) {
        chartReference.data = getDatasets(value, $averageResistance);
        chartReference.update();
      }
    } catch (e) {
      isError = true;
      console.error(ERROR_MESSAGE, e);
    }
  });

  averageResistance.subscribe((value) => {
    try {
      if (chartReference) {
        chartReference.data = getDatasets($averageCadence, value);
        chartReference.update();
      }
    } catch (e) {
      isError = true;
      console.error(ERROR_MESSAGE, e);
    }
  });
</script>

<section>
  <div class="section-wrapper">
  {#if isError}
    <p>{ERROR_MESSAGE}</p>
  {:else}
    <h2>Average Cadence vs Resistance</h2>
    <LineChart
      title="Average Cadence vs Resistance"
      {datasets}
      isDarkMode=true
      isSimpleDisplay=true
      bind:chartReference />
  {/if}
</div>
</section>

<style>
  section{
    background: #1A5B92;
    color: #fff;
  }
  .section-wrapper{
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 10px;
  }
</style>

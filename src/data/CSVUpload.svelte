<script>
  import {onMount} from "svelte";
  import {csvData, isError} from "../store/store.js";
  import {csvToJson} from "../utils/fileUtils";

  let files;
  // let errorStatus = false;
  let y = 0;

  onMount(async () => {
    const localStorageData = localStorage.getItem("savedData");

    if (localStorageData) {
      updateData(JSON.parse(localStorageData));
    }
  });

  const updateData = (json) => {
    localStorage.clear();
    csvData.set();
    isError.set(false);
    try {
      csvData.set(json);
      y = 0;
      localStorage.setItem("savedData", JSON.stringify(json));
    } catch (error) {
      console.error("An error occurred uploading the data", error);
      isError.set(true);
    }
  };

  const upload = () => {
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const json = csvToJson(e.target.result);
        updateData(json);
      };
      reader.readAsText(files[0]);
    }
  };
</script>

<style>
  section {
    position: relative;
  }
  .section-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 10px;
    display: flex;
  }
  .left,
  .right {
    flex: 0 1 50%;
  }
  ol > li {
    font-size: 18px;
    margin-bottom: 0.5em;
  }
  p {
    margin-top: 20px;
    font-style: italic;
    text-align: center;
  }
  form {
    text-align: center;
  }
  div {
    margin: 0 auto;
    max-width: 400px;
  }
  label {
    margin: 20px 0;
  }
  button {
    background-color: #013a63;
    border: 0;
    border-radius: 30px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 13px;
    display: block;
    padding: 10px;
    transition: 0.5s all;
    width: 100%;
    max-width: 400px;
    margin: 0 auto 20px;
    cursor: pointer;
  }
  button:hover,
  button:focus {
    background-color: #04a6c2;
    outline: 0;
  }
  button:active {
    background-color: #20bac5;
    color: #fff;
  }
  @media only screen and (max-width: 768px) {
    .section-wrapper {
      flex-direction: column;
    }
    .left{
      margin-bottom: 60px;
    }
  }
</style>

<svelte:window bind:scrollY={y} />

<section>
  <div class="section-wrapper">
    <div class="left">
      <h2>Instructions</h2>
      <ol>
        <li>
          Download your Workout CSV from your
          <a
            target="_blank"
            href="https://members.onepeloton.com/profile/workouts">Peloton
            profile</a>
        </li>
        <li>Upload the CSV file</li>
      </ol>
    </div>
    <div class="right">
      <h2>CSV Upload</h2>
      <form on:submit|preventDefault={upload}>
        <label> CSV Upload: <input required type="file" bind:files /> </label>
        <div><button type="submit">See My Metrics</button></div>
        <p>
          Note: Your data is not sent anywhere or stored remotely. This app runs
          in the browser and uses local storage on your device.
        </p>
      </form>
    </div>
  </div>
</section>

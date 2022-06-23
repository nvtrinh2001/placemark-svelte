<script>
  import layer_1 from "../assets/layer-1.jpeg";
  import layer_2 from "../assets/layer-2.png";
</script>

<div class="bg-container">
  <img class="layer1" src={layer_1} alt="background" />
  <div class="title-container">
    <p class="sub-title">TRAVELLING EXPERTS</p>
    <div style="padding: 8px;">
      <p class="title title1">Your Travel</p>
      <p class="title title2">Advisor</p>
    </div>
  </div>
  <div class="container" style="position: relative;">
    <img class="layer2" src={layer_2} alt="background" />
  </div>
</div>

<style>
  .bg-container {
    position: relative;
    background-color: rgb(39, 39, 39);
    min-height: 1380px;
  }
  .layer1 {
    position: relative;
    width: 100%;
    max-height: fit-content;
    top: -60px;
  }
  .layer2 {
    width: 100%;
    position: absolute;
    bottom: -160px;
    left: 0;
  }
  .title-container {
    position: absolute;
    top: 180px;
    text-align: center;
    left: 0;
    right: 0;
  }
  .sub-title {
    font-size: 16px;
    letter-spacing: 4px;
  }
  .title1 {
    margin: 0;
    padding: 0 0 4px 0;
    font-size: 68px;
    letter-spacing: 2px;
  }
  .title2 {
    margin: 0;
    padding: 4px 0;
    font-size: 68px;
    letter-spacing: 2px;
  }
</style>

<template>
  <div class="dailymeteo__card">
    <div class="row__one">
    <TownSelect />
    <DailyMeteo2 />
    </div>
    <div class="row__two">
    <DailyMeteoPerHour />
    </div>
  </div>
</template>



<script setup>
import DailyMeteo2 from "./DailyMeteo2.vue";
import TownSelect from "./TownSelect.vue";
import DailyMeteoPerHour from "./DailyMeteoPerHour.vue";

</script>

<style scoped>

.dailymeteo__card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 1rem;
  align-items: center;
  height: 100%;
  padding-top: 2rem;
  padding-bottom: 1rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  background: linear-gradient(to right, #2c3e5062, #4ca2af6c);
  /* border-radius: 15px;  */
  margin: 0 auto;
}


.row__one {
  display: flex;
  justify-content: space-around;
  align-items: space-around;
  width: 95%;
  height: 50%;
  gap: 2rem;
}

.row__two {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 95%;
  height: 50%;
  gap: 1rem
}

</style>
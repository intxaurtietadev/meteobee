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
  gap: var(--space-sm);
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: var(--space-lg);
  padding-bottom: var(--space-md);
  box-shadow: var(--box-shadow);
  transition: transform var(--transition-duration);
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
  gap: var(--space-md);
}

.row__two {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 95%;
  height: 50%;
  gap: var(--space-sm);
}

</style>
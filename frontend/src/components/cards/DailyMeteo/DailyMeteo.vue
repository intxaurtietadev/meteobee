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
  padding: 2rem 1rem;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s;
  border-radius: var(--border-radius);
  margin: 0 auto;
  width: 95%;
  max-width: 100rem;
}

.row__one,
.row__two {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 2rem;
}

/* Tablets medianas */
@media (max-width: 1024px) {
  .dailymeteo__card {
    gap: 0.75rem;
    padding: 1.5rem 1rem;
  }

  .row__one,
  .row__two {
    gap: 1.5rem;
  }
}

/* Tablets pequeñas y móviles grandes (≤768px) */
@media (max-width: 768px) {
  .dailymeteo__card {
    gap: 0.5rem;
    padding: 1rem 0.5rem;
  }

  .row__one,
  .row__two {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}

/* Móviles pequeños (≤480px) */
@media (max-width: 480px) {
  .dailymeteo__card {
    width: 100%;
    border-radius: 0;
    box-shadow: none;
    padding: 0.5rem 0.25rem;
  }

  .row__one,
  .row__two {
    width: 100%;
    gap: 0.75rem;
  }
}


</style>
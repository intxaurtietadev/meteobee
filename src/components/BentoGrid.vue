  <template>
    <div class="grid-container" ref="container">
      <!-- Cada tarjeta está envuelta en un div con data-swapy-slot -->
      <div data-swapy-slot="card1" class="grid__slot">
        <BentoCard
          title="Customization"
          description="Use a pre-designed template or personalize with video, stickers, fonts, and more."
          bgColor="#f6b83c"
          img="https://via.placeholder.com/100"
          class="card1"
          data-swapy-item="item1"
        />
      </div>

      <div data-swapy-grid__slot="card2" class="grid__slot">
        <BentoCard
          title="Scheduling"
          description="Schedule all your cards and gifts now and we'll send them later."
          bgColor="#a3d55d"
          img="https://via.placeholder.com/100"
          class="card2"
          data-swapy-item="item2"
        />
      </div>

      <div data-swapy-slot="card3" class="grid__slot">
        <BentoCard
          title="Wallet"
          description="Access all your gifts and save up your Givingli Cash."
          bgColor="#f0c17a"
          img="https://via.placeholder.com/100"
          class="card3"
          data-swapy-item="item3"
        />
      </div>

      <div data-swapy-slot="card4" class="grid__slot">
        <BentoCard
          title="Inbox"
          description="Track your gifts, group chats, and sent cards."
          bgColor="#f5e55c"
          img="https://via.placeholder.com/100"
          class="card4"
          data-swapy-item="item4"
        />
      </div>

      <div data-swapy-slot="card5" class="grid__slot">
        <BentoCard
          title="Send Gifts"
          description="Send as a group with friends or individually."
          bgColor="#4d6c32"
          img="https://via.placeholder.com/100"
          class="card5"
          data-swapy-item="item5"
        />
      </div>

      <div data-swapy-slot="card6" class="grid__slot">
        <BentoCard
          title="Reminders"
          description="Never miss a birthday again."
          bgColor="#f6b83c"
          img="https://via.placeholder.com/100"
          class="card6"
          data-swapy-item="item6"
        />
      </div>
    </div>
  </template>

  <script setup>
  import BentoCard from './BentoCard.vue';
 /* import { createSwapy } from 'swapy';
  import { onMounted, onUnmounted, ref } from 'vue';
  

  const container = ref(null);
  const swapy = ref(null);

  onMounted(() => {
    if (container.value) {
      // Inicializa Swapy en el contenedor del grid
      swapy.value = createSwapy(container.value,  {
        animation: 'dynamic',
        swapMode: 'drop',
        autoScrollOnDrag: true});

      // Escucha el evento de intercambio
      swapy.value.onSwap((event) => {
        console.log('Elementos intercambiados:', event);
      });
    }
  });

  onUnmounted(() => {
    // Destruye la instancia de Swapy cuando el componente se desmonte
    swapy.value?.destroy();
  });*/
  </script>

  <style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 columnas */
    grid-template-rows: auto auto auto; /* 3 filas */
    grid-template-areas:
      "card1 card2 card2"
      "card1 card3 card4"
      "card5 card5 card6";
    gap: 1.25rem;
    padding: 2.5rem;
    max-width: 75rem;
    margin: 0 auto;
    margin-top: 4rem;
  }

  /* Estilos para los slots */
  .grid__slot {
    display: contents; /* Evita que los divs adicionales afecten el grid */
  }
  .grid__slot[data-swapy-highlighted] {
  background: rgba(255, 255, 255, 0.2);
}

  .card1 {
    grid-area: card1;
  }

  .card2 {
    grid-area: card2;
  }

  .card3 {
    grid-area: card3;
  }

  .card4 {
    grid-area: card4;
  }

  .card5 {
    grid-area: card5;
  }

  .card6 {
    grid-area: card6;
  }
  </style>
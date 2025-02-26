<script setup>
import { ref, onMounted } from 'vue';

const playlistUrl = ref('');

const playlistData = {
  "playlists": [
    {
      "id": 1,
      "name": "Día lluvioso",
      "url": "https://open.spotify.com/embed/playlist/37i9dQZF1EIh5QTm0PNBlW?utm_source=generator"
    }
  ]
};

onMounted(() => {
  playlistUrl.value = playlistData.playlists[0].url;
});
</script>
<template>

    <div>
        <iframe 
        :src="playlistUrl"
        style="border-radius:12px" 
        width="100%" height="352" 
        frameBorder="0" 
        allowfullscreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy">
    </iframe>
    </div>
</template>
<style scoped>
</style>
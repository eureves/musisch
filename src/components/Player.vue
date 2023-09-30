<script>
import { mapActions, mapState } from 'pinia'
import usePlayerStore from '@/stores/Player'

export default {
  name: 'AppPlayer',
  computed: {
    ...mapState(usePlayerStore, ['playing', 'duration', 'seek', 'playerProgress', 'currentSong'])
  },
  methods: {
    ...mapActions(usePlayerStore, ['toggleAudio', 'updateSeek'])
  }
}
</script>

<template>
  <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
    <!-- Track Info -->
    <div v-if="currentSong.modifiedName" class="text-center">
      <span class="song-title font-bold">{{ currentSong.modifiedName }}</span> by
      <span class="song-artist">{{ currentSong.displayName }}</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio">
        <i
          :class="{ 'fa-play': !playing, 'fa-pause': playing }"
          class="fa text-gray-500 text-xl"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div
        class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
        @click.prevent="updateSeek"
      >
        <!-- Player Ball -->
        <span
          :style="{ left: playerProgress }"
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          :style="{ width: playerProgress }"
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ duration }}</div>
    </div>
  </div>
</template>

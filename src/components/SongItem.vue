<script>
export default {
  name: 'SongItem',
  props: {
    song: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <RouterLink
        :to="{ name: 'song', params: { id: song.docId }, query: { sort: 'new' } }"
        class="font-bold block text-gray-600"
      >
        {{ song.modifiedName }}
      </RouterLink>
      <span class="text-gray-500 text-sm">{{ song.displayName }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <RouterLink
        v-slot="{ navigate }"
        :to="{
          name: 'song',
          params: { id: song.docId },
          query: { sort: 'new' },
          hash: '#comments'
        }"
        custom
      >
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.commentCount }}
        </span>
      </RouterLink>
    </div>
  </li>
</template>

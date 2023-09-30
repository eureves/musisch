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
        :to="{ name: 'song', params: { id: song.docId } }"
        class="font-bold block text-gray-600"
      >
        {{ song.modifiedName }}
      </RouterLink>
      <span class="text-gray-500 text-sm">{{ song.dysplayName }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <span class="comments">
        <i class="fa fa-comments text-gray-600"></i>
        {{ song.commentCount }}
      </span>
    </div>
  </li>
</template>

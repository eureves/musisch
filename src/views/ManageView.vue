<script>
import AppUpload from '@/components/Upload.vue'
import { auth, songsCollection } from '@/includes/firebase'
import CompositionItem from '@/components/CompositionItem.vue'

export default {
  name: 'ManageView',
  components: {
    AppUpload,
    CompositionItem
  },
  data() {
    return {
      songsList: [],
      unsavedFlag: false,
      foo: true
    }
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

    snapshot.forEach(this.addSong)
  },
  methods: {
    updateSong(i, values) {
      this.songsList[i].modifiedName = values.modifiedName
      this.songsList[i].genre = values.genre
    },
    removeSong(index) {
      this.songsList.splice(index, 1)
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docId: document.id
      }

      this.songsList.push(song)
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) next()
    else {
      // eslint-disable-next-line no-unused-vars
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
      next(leave)
    }
  }
}
</script>

<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <AppUpload :addSong="addSong" :foo="foo"/>
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <CompositionItem
              v-for="(song, index) in songsList"
              :key="song.docId"
              :song="song"
              :index="index"
              :updateSong="updateSong"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { auth, songsCollection, storage } from '@/includes/firebase'

export default {
  name: 'AppUpload',
  props: ['addSong', 'foo'],
  data() {
    return {
      isDragOver: false,
      uploads: []
    }
  },
  methods: {
    upload($event) {
      this.isDragOver = false

      const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files]

      files.forEach((file) => {
        if (file.type !== 'audio/mpeg') return

        if (!navigator.onLine) {
          this.uploads.push({
            task: {},
            currentProgress: 100,
            name: file.name,
            variant: 'bg-red-400',
            icon: 'fas fa-times',
            textClass: 'text-red-400'
          })
          return
        }

        const storageRef = storage.ref()
        const songsRef = storageRef.child(`songs/${file.name}`)
        const task = songsRef.put(file)

        const uploadId =
          this.uploads.push({
            task,
            currentProgress: 0,
            name: file.name,
            variant: 'bg-blue-400',
            icon: 'fas fa-spinner fa-spin',
            textClass: ''
          }) - 1

        task.on(
          'state_change',
          (snapshot) => {
            this.uploads[uploadId].currentProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          },
          (error) => {
            this.uploads[uploadId].variant = 'bg-red-400'
            this.uploads[uploadId].icon = 'fas fa-times'
            this.uploads[uploadId].textClass = 'text-red-400'
            console.log(error)
          },
          async () => {
            const song = {
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
              originalName: task.snapshot.ref.name,
              modifiedName: task.snapshot.ref.name,
              genre: '',
              commentCount: 0
            }

            song.url = await task.snapshot.ref.getDownloadURL()
            const songRef = await songsCollection.add(song)
            const songSnapshot = await songRef.get()

            this.addSong(songSnapshot)

            this.uploads[uploadId].variant = 'bg-green-400'
            this.uploads[uploadId].icon = 'fas fa-check'
            this.uploads[uploadId].textClass = 'text-green-400'
          }
        )
      })
    }
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel()
    })
  }
}
</script>

<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">{{ $t('upload.upload') }}</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        :class="{ 'bg-green-400 border-green-400 border-solid': isDragOver }"
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="isDragOver = false"
        @dragover.prevent.stop="isDragOver = true"
        @dragenter.prevent.stop="isDragOver = true"
        @dragleave.prevent.stop="isDragOver = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>{{ $t('upload.dropYourFilesHere') }}</h5>
      </div>
      <input multiple type="file" @change="upload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div v-for="upload in uploads" :key="upload.name" class="mb-4">
        <!-- File Name -->
        <div :class="upload.textClass" class="font-bold text-sm">
          <i :class="upload.icon" /> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            :class="upload.variant"
            :style="{ width: upload.currentProgress + '%' }"
            class="transition-all progress-bar bg-blue-400"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

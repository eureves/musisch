<script>
import { songsCollection, storage } from '@/includes/firebase'

export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true
    },
    removeSong: {
      type: Function,
      required: true
    },
    updateSong: {
      type: Function,
      required: true
    },
    updateUnsavedFlag: {
      type: Function
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showForm: false,
      schema: {
        modifiedName: 'required'
      },
      inSubmission: false,
      showAlert: false,
      alertVariant: 'bg-blue-500',
      alertMessage: 'Please wait! Updating song info.'
    }
  },
  methods: {
    async submitForm(values) {
      this.inSubmission = true
      this.showAlert = true
      this.alertVariant = 'bg-blue-500'
      this.alertMessage = 'Please wait! Updating song info.'

      try {
        await songsCollection.doc(this.song.docId).update(values)
      } catch (error) {
        this.inSubmission = false
        this.alertVariant = 'bg-red-500'
        this.alertMessage = 'Something went wrong! Try again later.'
        return
      }

      this.updateSong(this.index, values)
      this.updateUnsavedFlag(false)

      this.inSubmission = false
      this.alertVariant = 'bg-green-500'
      this.alertMessage = 'Success!'
    },
    async deleteSong() {
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${this.song.originalName}`)

      await songRef.delete()

      await songsCollection.doc(this.song.docId).delete()

      this.removeSong(this.index)
    }
  }
}
</script>

<template>
  <!-- Composition Items -->
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div v-if="showAlert" :class="alertVariant" class="text-white text-center font-bold p-4 mb-4">
        {{ alertMessage }}
      </div>
      <VeeForm :initial-values="song" :validation-schema="schema" @submit="submitForm">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('composItem.songTitle') }}</label>
          <VeeField
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            name="modifiedName"
            placeholder="Enter Song Title"
            type="text"
          />
          <VeeError class="text-red-400" name="modifiedName" @click.prevent="deleteSong" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('composItem.genre') }}</label>
          <VeeField
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            name="genre"
            placeholder="Enter Genre"
            type="text"
            @input="updateUnsavedFlag(true)"
          />
          <VeeError class="text-red-400" name="genre" />
        </div>
        <button
          :disabled="inSubmission"
          class="py-1.5 mr-3 px-3 rounded text-white bg-green-600"
          type="submit"
        >
          {{ $t('composItem.submit') }}
        </button>
        <button
          :disabled="inSubmission"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          type="button"
          @input="updateUnsavedFlag(true)"
          @click.prevent="showForm = false"
        >
          {{ $t('composItem.goBack') }}
        </button>
      </VeeForm>
    </div>
  </div>
</template>

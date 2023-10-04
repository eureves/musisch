<script>
import { auth, commentsCollection, songsCollection } from '@/includes/firebase'
import { mapActions, mapState } from 'pinia'
import useUserStore from '@/stores/User'
import usePlayerStore from '@/stores/Player'

export default {
  name: 'SongView',
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === 'new') {
          return new Date(b.datePosted) - new Date(a.datePosted)
        }

        return new Date(a.datePosted) - new Date(b.datePosted)
      })
    }
  },
  data() {
    return {
      song: {},
      comments: [],
      commentSchema: {
        comment: 'required|min:3'
      },
      inSubmission: false,
      showAlert: false,
      alertVariant: 'bg-blue-500',
      alertMessage: 'Please wait! Your comment is being submitted.',
      sort: '1'
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
    async submitComment(values, { resetForm }) {
      this.inSubmission = true
      this.showAlert = true
      this.alertVariant = 'bg-blue-500'
      this.alertMessage = 'Please wait! Your comment is being submitted.'

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sid: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid
      }

      await commentsCollection.add(comment)

      this.song.commentCount += 1
      await songsCollection.doc(this.$route.params.id).update({
        commentCount: this.song.commentCount
      })

      await this.getComments()

      this.inSubmission = false
      this.alertVariant = 'bg-green-500'
      this.alertMessage = 'Success!'

      resetForm()
    },
    async getComments() {
      const commentsSnapshot = await commentsCollection
        .where('sid', '==', this.$route.params.id)
        .get()

      this.comments = []
      commentsSnapshot.forEach((doc) => {
        this.comments.push({
          docIf: doc.id,
          ...doc.data()
        })
      })
    }
  },
  async created() {
    const docSnapshot = await songsCollection.doc(this.$route.params.id).get()

    if (!docSnapshot.exists) {
      this.$router.push({ name: 'home' })
      return
    }

    const { sort } = this.$route.query

    this.sort = sort === 'new' || sort === 'old' ? sort : 'new'

    this.song = docSnapshot.data()
    await this.getComments()
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) return

      this.$router.push({
        query: {
          sort: newVal
        }
      })
    }
  }
}
</script>

<template>
  <!-- Music Header -->
  <main>
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          id="play-btn"
          class="z-10 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
          type="button"
          @click.prevent="newSong(song)"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-10 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
          <div>{{ song.genre }}</div>
          <div class="song-price">{{ $n(100, 'currency') }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section id="comments" class="container mx-auto mt-6">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">{{
            $tc('songView.commentCount', song.commentCount, { count: song.commentCount })
          }}</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            v-if="showAlert"
            :class="alertVariant"
            class="text-white text-center font-bold p-4 mb-4"
          >
            {{ alertMessage }}
          </div>
          <VeeForm v-show="userLoggedIn" :validation-schema="commentSchema" @submit="submitComment">
            <VeeField
              as="textarea"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              name="comment"
              placeholder="Your comment here..."
            ></VeeField>
            <VeeError class="text-red-500" name="comment" />
            <button
              :disabled="inSubmission"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              type="submit"
            >
              Submit
            </button>
          </VeeForm>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="new">Latest</option>
            <option value="old">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        v-for="comment in sortedComments"
        :key="comment.docId"
        class="p-6 bg-gray-50 border border-gray-200"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>
        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </main>
</template>

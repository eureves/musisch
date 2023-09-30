<script>
// import { RouterLink, RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppAuth from '@/components/AppAuth.vue'
import { auth } from './includes/firebase'
import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/User'
import AppPlayer from '@/components/Player.vue'

export default {
  name: 'App',
  components: {
    AppPlayer,
    AppHeader,
    AppAuth
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<template>
  <AppHeader />

  <RouterView />

  <AppPlayer />

  <AppAuth v-show="!userLoggedIn" />
</template>

<style></style>

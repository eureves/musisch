<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/User'

export default {
  name: 'loginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:10|max:16'
      },
      loginInSubmission: false,
      loginShowAlert: false,
      loginAlertVariant: 'bg-blue-500',
      loginAlertMsg: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),
    async login(values) {
      this.loginShowAlert = true
      this.loginInSubmission = true
      this.loginAlertVariant = 'bg-blue-500'
      this.loginAlertMsg = 'Please wait! We are loging you in.'

      try {
        await this.authenticate(values)
      } catch (error) {
        console.log(error)

        this.loginShowAlert = false
        this.loginInSubmission = false
        this.loginAlertVariant = 'bg-red-500'
        this.loginAlertMsg = 'An unexpected error occured. Please try again later'
        return
      }

      this.loginInSubmission = false
      this.loginAlertVariant = 'bg-green-500'
      this.loginAlertMsg = 'Seccess! You are now logged in.'
    },
    enterLocaleForm(val) {
      return `${this.$t('logRegForm.enter')} ${val}`
    }
  }
}
</script>

<template>
  <div
    v-show="loginShowAlert"
    :class="loginAlertVariant"
    class="text-white text-center font-bold p-4 rounded mb-4"
  >
    {{ loginAlertMsg }}
  </div>
  <VeeForm :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('logRegForm.email') }}</label>
      <VeeField
        :placeholder="enterLocaleForm($t('logRegForm.email'))"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        name="email"
        type="email"
      />
      <VeeError class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('logRegForm.password') }}</label>
      <VeeField
        :placeholder="enterLocaleForm($t('logRegForm.password'))"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        name="password"
        type="password"
      />
      <VeeError class="text-red-600" name="password" />
    </div>
    <button
      :disabled="loginInSubmission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      type="submit"
    >
      {{ $t('logRegForm.submit') }}
    </button>
  </VeeForm>
</template>

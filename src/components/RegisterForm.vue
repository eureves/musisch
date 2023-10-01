<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/User'

export default {
  name: 'registerForm',
  computed: {},
  data() {
    return {
      registerSchema: {
        name: 'required',
        email: 'required|email',
        age: 'required|minVal:18|maxVal:114',
        password: 'required|min:10|max:16|excluded:password',
        confirm_password: 'required|passwordsMismatch:@password',
        country: 'required',
        tos: 'requiredTos'
      },
      userData: {
        country: 'USA'
      },
      regInSubmission: false,
      regShowAlert: false,
      regAlertVariant: 'bg-blue-500',
      regAlertMsg: 'Please wait! Your account is being created.'
    }
  },
  methods: {
    ...mapActions(useUserStore, { createUser: 'register' }),
    async register(values) {
      this.regShowAlert = true
      this.regInSubmission = true
      this.regAlertVariant = 'bg-blue-500'
      this.regAlertMsg = 'Please wait! Your account is being created.'

      try {
        await this.createUser(values)
      } catch (error) {
        console.log(error)

        this.regShowAlert = false
        this.regInSubmission = false
        this.regAlertVariant = 'bg-red-500'
        this.regAlertMsg = 'An unexpected error occured. Please try again latere'
        return
      }

      this.regInSubmission = false
      this.regAlertVariant = 'bg-green-500'
      this.regAlertMsg = 'Success! Your account has been created.'
    },
    enterLocaleForm(val) {
      return `${this.$t('logRegForm.enter')} ${val}`
    }
  }
}
</script>

<template>
  <div
    v-show="regShowAlert"
    :class="regAlertVariant"
    class="text-white text-center font-bold p-4 rounded mb-4"
  >
    {{ regAlertMsg }}
  </div>
  <VeeForm :initial-values="userData" :validation-schema="registerSchema" @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('logRegForm.name') }}</label>
      <VeeField
        :placeholder="enterLocaleForm($t('logRegForm.name'))"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        name="name"
        type="text"
      />
      <VeeError class="text-red-600" name="name" />
    </div>
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
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('logRegForm.age') }}</label>
      <VeeField
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        name="age"
        type="number"
      />
      <VeeError class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('logRegForm.password') }}</label>
      <VeeField v-slot="{ field, errors }" :bails="false" name="password">
        <input
          :placeholder="enterLocaleForm($t('logRegForm.password'))"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          type="password"
          v-bind="field"
        />
        <div v-for="error in errors" :key="error" class="text-red-600">{{ error }}</div>
      </VeeField>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('logRegForm.confirmPassword') }}</label>
      <VeeField
        :placeholder="enterLocaleForm($t('logRegForm.confirmPassword'))"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        name="confirm_password"
        type="password"
      />
      <VeeError class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('logRegForm.country') }}</label>
      <VeeField
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        name="country"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
      </VeeField>
      <VeeError class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        name="tos"
        type="checkbox"
        value="1"
      />
      <i18n-t class="inline-block" keypath="logRegForm.accept" tag="label">
        <a href="#">{{ $t('logRegForm.tos') }}</a>
      </i18n-t>
      <VeeError class="text-red-600 block" name="tos" />
    </div>
    <button
      :disabled="regInSubmission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      type="submit"
    >
      {{ $t('logRegForm.submit') }}
    </button>
  </VeeForm>
</template>

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

        this.regInSubmission = false
        this.regAlertVariant = 'bg-red-500'
        this.regAlertMsg = 'An unexpected error occured. Please try again latere'
        return
      }

      this.regAlertVariant = 'bg-green-500'
      this.regAlertMsg = 'Success! Your account has been created.'
    }
  }
}
</script>

<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-show="regShowAlert"
    :class="regAlertVariant"
  >
    {{ regAlertMsg }}
  </div>
  <VeeForm :initial-values="userData" :validation-schema="registerSchema" @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <VeeField
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
        type="text"
      />
      <VeeError name="name" class="text-red-600" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
        type="email"
      />
      <VeeError name="email" class="text-red-600" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <VeeField
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        type="number"
      />
      <VeeError name="age" class="text-red-600" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField name="password" :bails="false" v-slot="{ field, errors }">
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          type="password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
      </VeeField>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <VeeField
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
        type="password"
      />
      <VeeError name="confirm_password" class="text-red-600" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <VeeField
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
      </VeeField>
      <VeeError name="country" class="text-red-600" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField
        value="1"
        name="tos"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        type="checkbox"
      />
      <label class="inline-block">Accept terms of service</label>
      <VeeError name="tos" class="text-red-600 block" />
    </div>
    <button
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      type="submit"
      :disabled="regInSubmission"
    >
      Submit
    </button>
  </VeeForm>
</template>

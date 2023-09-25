<script>
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
    login() {
      this.loginShowAlert = true
      this.loginInSubmission = true
      this.loginAlertVariant = 'bg-blue-500'
      this.loginAlertMsg = 'Please wait! We are loging you in.'

      this.loginAlertVariant = 'bg-green-500'
      this.loginAlertMsg = 'Seccess! You are now logged in.'
    }
  }
}
</script>

<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-show="loginShowAlert"
    :class="loginAlertVariant"
  >
    {{ loginAlertMsg }}
  </div>
  <VeeForm :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
        type="email"
      />
      <VeeError class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
        type="password"
      />
      <VeeError class="text-red-600" name="password" />
    </div>
    <button
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="loginInSubmission"
      type="submit"
    >
      Submit
    </button>
  </VeeForm>
</template>

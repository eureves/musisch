<script>
import useModalStore from '@/stores/Modal'
import { mapState, mapWritableState } from 'pinia'

export default {
  name: 'AppAuth',
  computed: {
    ...mapState(useModalStore, ['hiddenClass']),
    ...mapWritableState(useModalStore, {
      modalVisibility: 'isOpen'
    })
  },
  methods: {
    register() {
      this.regShowAlert = true
      this.regInSubmission = true
      this.regAlertVariant = 'bg-blue-500'
      this.regAlertMsg = 'Please wait! Your account is being created.'

      this.regAlertVariant = 'bg-green-500'
      this.regAlertMsg = 'Success! Your account has been created.'
    }
  },
  data() {
    return {
      tab: 'login',
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
  }
}
</script>

<template>
  <div id="modal" :class="hiddenClass" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="modalVisibility = false">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'login',
                  'hover:text-blue-600': tab === 'register'
                }"
                class="block rounded py-3 px-4 transition"
                href="#"
                @click.prevent="tab = 'login'"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'register',
                  'hover:text-blue-600': tab === 'login'
                }"
                class="block rounded py-3 px-4 transition"
                href="#"
                @click.prevent="tab = 'register'"
                >Register</a
              >
            </li>
          </ul>

          <!-- Login Form -->
          <div
            class="text-white text-center font-bold p-4 rounded mb-4"
            v-show="regShowAlert"
            :class="regAlertVariant"
          >
            {{ regAlertMsg }}
          </div>
          <VeeForm v-show="tab === 'login'">
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <VeeField
                name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
                type="email"
              />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <input
                name="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password"
                type="password"
              />
            </div>
            <button
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
              type="submit"
            >
              Submit
            </button>
          </VeeForm>
          <!-- Registration Form -->
          <VeeForm
            v-show="tab === 'register'"
            :initial-values="userData"
            :validation-schema="registerSchema"
            @submit="register"
          >
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
<script setup>
import { store } from '~/store/store'

const toast = useToast()
const loginForm = reactive({
  email: '',
  password: ''
})
const isLoading = ref(false)

const handleLogin = async () => {
  try {
    isLoading.value = true
    // Add your login logic here
    const {data, error, status} = await useApi('auth/login/',{
      method: 'POST',
      body: loginForm,
      watch:false
    })
    if (status.value === 'success') {
        toast.add({
          title: 'Success!',
          description: 'Logged in successfully',
          color: 'green'
        })
        store.isLoginModelOpen = false
        const user = useStatefulCookie('user-store')
        console.log(data.value)
        user.value = {
            ...data.value,
        }
      } else {
        toast.add({
          title: 'Error!',
          description: error.value.data.error || 'An error occurred. Please try again',
          color: 'red'
        })
      }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
        <!-- Login Modal -->
    <UModal v-model="store.isLoginModelOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100' }">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-user-circle" class="w-6 h-6 text-primary" />
            <h3 class="text-xl font-semibold">Welcome Back</h3>
          </div>
        </template>

        <form @submit.prevent="handleLogin" class="space-y-4 py-4">
          <UFormGroup label="Email">
            <UInput
              v-model="loginForm.email"
              type="email"
              placeholder="Enter your email"
              icon="i-heroicons-envelope"
              required
            />
          </UFormGroup>

          <UFormGroup label="Password">
            <UInput
              v-model="loginForm.password"
              type="password"
              placeholder="Enter your password"
              icon="i-heroicons-lock-closed"
              required
            />
          </UFormGroup>
          <div class="flex justify-end items-end gap-4">
            <UButton
              color="gray"
              variant="soft"
              @click="store.isLoginModelOpen = false"
            >
              Cancel
            </UButton>
            <UButton
              color="primary"
              @click="handleLogin"
              :loading="isLoading"
            >
              Login
            </UButton>
          </div>
        </form>

      </UCard>
    </UModal>
</template>
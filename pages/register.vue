<template>
    <main class="bg-gray-50 py-12">
      <div class="container mx-auto px-6">
        <UCard class="max-w-md mx-auto">
          <template #header>
            <div class="text-center">
              <h1 class="text-2xl font-bold text-gray-900">
                {{ userType === 'student' ? 'Student' : 'Company' }} Registration
              </h1>
              <p class="mt-2 text-gray-600">
                Create your account to get started
              </p>
            </div>
          </template>
  
          <form @submit.prevent="handleRegister" class="space-y-6">
            <!-- User Type Selection -->
            <UFormGroup label="Account Type">
              <USelect
                v-model="form.role"
                :options="userTypes"
                option-attribute="label"
                value-attribute="value"
                class="w-full"
                required
              />
            </UFormGroup>
  
            <!-- Username -->
            <UFormGroup
              label="Username"
              :error="errors.username"
            >
              <UInput
                v-model="form.username"
                placeholder="Enter your username"
                icon="i-heroicons-user"
                required
              />
            </UFormGroup>
  
            <!-- Email -->
            <UFormGroup
              label="Email"
              :error="errors.email"
            >
              <UInput
                v-model="form.email"
                type="email"
                placeholder="Enter your email"
                icon="i-heroicons-envelope"
                required
              />
            </UFormGroup>
  
            <!-- Password -->
            <UFormGroup
              label="Password"
              :error="errors.password"
            >
              <UInput
                v-model="form.password"
                type="password"
                placeholder="Create a password"
                icon="i-heroicons-lock-closed"
                required
              />
            </UFormGroup>
  
            <!-- Submit Button -->
            <UButton
              type="submit"
              color="primary"
              size="lg"
              block
              :loading="isLoading"
            >
              Create Account
            </UButton>
          </form>
  
          <!-- Login Link -->
          <div class="mt-6 gap-x-4 text-center text-sm text-gray-600">
            Already have an account?
            <UButton
              @click="store.isLoginModelOpen = true"
              class="font-medium text-white hover:text-primary-600"
            >
              Login here
            </UButton>
          </div>
        </UCard>
      </div>
    </main>
  </template>
  
  <script setup>
import { store } from '~/store/store'

  const route = useRoute()
  const router = useRouter()
  const toast = useToast()
  
  const userTypes = [
    { label: 'Student', value: 'student' },
    { label: 'Company', value: 'company' }
  ]
  
  // Initialize form with type from query params
  const userType = computed(() => route.query.type?.toString() || 'student')
  
  const form = reactive({
    username: '',
    email: '',
    password: '',
    role: userType.value
  })
  
  const errors = reactive({
    username: '',
    email: '',
    password: ''
  })
  
  const isLoading = ref(false)
  
  // Watch for query param changes
  watch(() => route.query.type, (newType) => {
    form.role = newType?.toString() || 'student'
  })
  
  const validateForm = () => {
    let isValid = true
    errors.username = ''
    errors.email = ''
    errors.password = ''
  
    if (!form.username || form.username.length < 3) {
      errors.username = 'Username must be at least 3 characters'
      isValid = false
    }
  
    if (!form.email || !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }
  
    if (!form.password || form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
      isValid = false
    }
  
    return isValid
  }
  
  const handleRegister = async () => {
    if (!validateForm()) return
  
    try {
      isLoading.value = true
      
      // Add your registration API call here
      // Example:
      // await $fetch('/api/register', {
      //   method: 'POST',
      //   body: form
      // })
  
      toast.add({
        title: 'Success!',
        description: 'Your account has been created successfully',
        color: 'green'
      })
  
      // Redirect to appropriate dashboard
      router.push(`/dashboard/${form.role}`)
    } catch (error) {
      toast.add({
        title: 'Error',
        description: error.message || 'Registration failed. Please try again.',
        color: 'red'
      })
    } finally {
      isLoading.value = false
    }
  }
  </script>
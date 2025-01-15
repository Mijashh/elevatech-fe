<template>
  <nav class="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 shadow-lg py-6">
    <div class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo & Brand -->
        <div class="flex items-center gap-6">
          <ULink to="/" class="flex justify-center items-center space-x-3">
            <UIcon name="i-heroicons-cube-transparent" class="w-8 h-8 text-white" />
            <span class="text-xl font-bold text-white">ElevaTech</span>
          </ULink>
          
          <!-- Main Navigation -->
          <div class="hidden md:flex space-x-6">
            <ULink to="/explore" class="text-white/90 hover:text-white transition-colors flex items-center justify-center space-x-3">
              <UIcon name="i-heroicons-globe-alt" class="w-5 h-5 inline-block mr-1" />
              Explore
            </ULink>
            <ULink to="/jobs" class="text-white/90 hover:text-white transition-colors flex items-center justify-center space-x-3">
              <UIcon name="i-heroicons-briefcase" class="w-5 h-5 inline-block mr-1" />
              <div>
              Jobs
              </div>
            </ULink>
            <ULink to="/companies" class="text-white/90 hover:text-white transition-colors flex items-center justify-center space-x-3">
              <UIcon name="i-heroicons-building-office" class="w-5 h-5 inline-block mr-1" />
              Companies
            </ULink>
          </div>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="hidden md:block">
            <UInput
              v-model="search"
              icon="i-heroicons-magnifying-glass"
              color="white"
              variant="outline"
              placeholder="Search..."
              class="w-64 bg-white/10 border-white/20 placeholder-white/70 text-white"
              trailing
            />
          </div>

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-3">
            <UButton
              @click="store.isLoginModelOpen = true"
              color="white"
              variant="solid"
              class="hidden md:flex"
            >
              Login
            </UButton>

            <!-- Mobile Menu Button -->
            <UButton
              color="white"
              variant="ghost"
              icon="i-heroicons-bars-3"
              class="md:hidden"
              @click="isMobileMenuOpen = true"
            />
          </div>
        </div>
      </div>
    </div>

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
        </form>

        <template #footer>
          <div class="flex justify-between items-center gap-4">
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
        </template>
      </UCard>
    </UModal>

    <!-- Mobile Menu -->
    <UModal v-model="isMobileMenuOpen" class="md:hidden">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100' }">
        <div class="space-y-4 py-4">
          <ULink
            v-for="item in mobileMenuItems"
            :key="item.to"
            :to="item.to"
            class="block px-4 py-2 hover:bg-gray-50 rounded-lg"
            @click="isMobileMenuOpen = false"
          >
            <UIcon :name="item.icon" class="w-5 h-5 inline-block mr-2" />
            {{ item.label }}
          </ULink>
        </div>
      </UCard>
    </UModal>
  </nav>
</template>

<script setup>
import { store } from '~/store/store'

const search = ref('')
const isMobileMenuOpen = ref(false)
const isLoading = ref(false)

const loginForm = reactive({
  email: '',
  password: ''
})

const mobileMenuItems = [
  { label: 'Explore', to: '/explore', icon: 'i-heroicons-globe-alt' },
  { label: 'Jobs', to: '/jobs', icon: 'i-heroicons-briefcase' },
  { label: 'Companies', to: '/companies', icon: 'i-heroicons-building-office' },
  { label: 'Login', to: '/login', icon: 'i-heroicons-user' },
  { label: 'Register', to: '/register', icon: 'i-heroicons-user-plus' }
]

const handleLogin = async () => {
  try {
    isLoading.value = true
    // Add your login logic here
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated delay
    store.isLoginModelOpen = false
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Optional: Add a subtle animation to the gradient */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
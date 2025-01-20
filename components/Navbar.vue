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
              v-if="!userStore.user"
              @click="userStore.isLoginModelOpen = true"
              color="white"
              variant="solid"
              class="hidden md:flex"
            >
              Login
            </UButton>

            <UBadge
              v-else
              color="white"
              variant="solid"
              class="hidden md:flex items-center space-x-2"
            >
              <UIcon name="i-heroicons-user-circle" class="w-5 h-5" />
              <span>{{ userStore.user.name }}</span>
            </UBadge>

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
 <LoginModal />


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
const userStore = useStatefulCookie('user-store')

const mobileMenuItems = [
  { label: 'Explore', to: '/explore', icon: 'i-heroicons-globe-alt' },
  { label: 'Jobs', to: '/jobs', icon: 'i-heroicons-briefcase' },
  { label: 'Companies', to: '/companies', icon: 'i-heroicons-building-office' },
  { label: 'Login', to: '/login', icon: 'i-heroicons-user' },
  { label: 'Register', to: '/register', icon: 'i-heroicons-user-plus' }
]

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
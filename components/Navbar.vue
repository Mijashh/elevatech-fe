<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto flex justify-between items-center px-6 py-4">
      <!-- Links -->
      <div class="flex space-x-6">
        <NuxtLink to="/" class="text-gray-700 font-medium hover:text-blue-500">Home</NuxtLink>
        <NuxtLink to="/contact" class="text-gray-700 font-medium hover:text-blue-500">Contact</NuxtLink>
        <NuxtLink to="/privacy" class="text-gray-700 font-medium hover:text-blue-500">Privacy</NuxtLink>
      </div>

      <!-- Login Button -->
      <div>
        <button
          @click="handleLogin"
          class="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from '#imports'

const router = useRouter()

const handleLogin = () => {
  router.push('/login')
}
</script>

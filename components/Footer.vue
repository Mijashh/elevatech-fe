<template>
    <footer class="bg-gray-50 border-t">
      <div class="container mx-auto px-6 py-12">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="space-y-4">
            <h3 class="font-semibold text-lg text-gray-900">Company</h3>
            <div class="space-y-2">
              <ULink to="/about" class="block text-gray-600 hover:text-primary">
                <UIcon name="i-heroicons-information-circle" class="mr-1" />
                About Us
              </ULink>
              <ULink to="/careers" class="block text-gray-600 hover:text-primary">
                <UIcon name="i-heroicons-briefcase" class="mr-1" />
                Careers
              </ULink>
              <ULink to="/blog" class="block text-gray-600 hover:text-primary">
                <UIcon name="i-heroicons-document-text" class="mr-1" />
                Blog
              </ULink>
            </div>
          </div>
  
          <!-- Resources -->
          <div class="space-y-4">
            <h3 class="font-semibold text-lg text-gray-900">Resources</h3>
            <div class="space-y-2">
              <ULink to="/documentation" class="block text-gray-600 hover:text-primary">
                <UIcon name="i-heroicons-book-open" class="mr-1" />
                Documentation
              </ULink>
              <ULink to="/help" class="block text-gray-600 hover:text-primary">
                <UIcon name="i-heroicons-question-mark-circle" class="mr-1" />
                Help Center
              </ULink>
              <ULink to="/guides" class="block text-gray-600 hover:text-primary">
                <UIcon name="i-heroicons-academic-cap" class="mr-1" />
                Guides
              </ULink>
            </div>
          </div>
  
          <!-- Legal -->
          <div class="space-y-4">
            <h3 class="font-semibold text-lg text-gray-900">Legal</h3>
            <div class="space-y-2">
              <ULink to="/privacy" class="block text-gray-600 hover:text-primary">
                <UIcon name="i-heroicons-shield-check" class="mr-1" />
                Privacy Policy
              </ULink>
              <ULink to="/terms" class="block text-gray-600 hover:text-primary">
                <UIcon name="i-heroicons-document" class="mr-1" />
                Terms of Service
              </ULink>
              <ULink to="/cookies" class="block text-gray-600 hover:text-primary">
                <UIcon name="i-heroicons-finger-print" class="mr-1" />
                Cookie Policy
              </ULink>
            </div>
          </div>
  
          <!-- Newsletter -->
          <div class="space-y-4">
            <h3 class="font-semibold text-lg text-gray-900">Stay Updated</h3>
            <p class="text-gray-600">Subscribe to our newsletter</p>
            <form @submit.prevent="handleSubscribe" class="space-y-2">
              <UInput
                v-model="email"
                type="email"
                placeholder="Enter your email"
                icon="i-heroicons-envelope"
                color="primary"
              />
              <UButton
                type="submit"
                color="primary"
                block
                :loading="isLoading"
              >
                Subscribe
              </UButton>
            </form>
          </div>
        </div>
  
        <!-- Social Links -->
        <div class="mt-12 pt-8 border-t border-gray-200">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <!-- Copyright -->
            <div class="text-gray-600">
              © {{ new Date().getFullYear() }} Your Company. All rights reserved.
            </div>
  
            <!-- Social Media Icons -->
            <div class="flex space-x-4">
              <UButton
                v-for="social in socialLinks"
                :key="social.name"
                :icon="social.icon"
                color="gray"
                variant="ghost"
                :to="social.url"
                target="_blank"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const isLoading = ref(false)
  const toast = useToast()
  
  const socialLinks = [
    {
      name: 'Twitter',
      icon: 'i-simple-icons-twitter',
      url: 'https://twitter.com/yourcompany'
    },
    {
      name: 'GitHub',
      icon: 'i-simple-icons-github',
      url: 'https://github.com/yourcompany'
    },
    {
      name: 'LinkedIn',
      icon: 'i-simple-icons-linkedin',
      url: 'https://linkedin.com/company/yourcompany'
    },
    {
      name: 'Discord',
      icon: 'i-simple-icons-discord',
      url: 'https://discord.gg/yourcompany'
    }
  ]
  
  const handleSubscribe = async () => {
    if (!email.value) {
      toast.add({
        title: 'Error',
        description: 'Please enter your email address',
        color: 'red'
      })
      return
    }
  
    try {
      isLoading.value = true
      // Add your newsletter subscription logic here
      // await subscribeToNewsletter(email.value)
      
      toast.add({
        title: 'Success!',
        description: 'You have been subscribed to our newsletter',
        color: 'green'
      })
      email.value = ''
    } catch (error) {
      toast.add({
        title: 'Error',
        description: 'Failed to subscribe. Please try again.',
        color: 'red'
      })
    } finally {
      isLoading.value = false
    }
  }
  </script>
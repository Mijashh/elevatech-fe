<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section with Company Info -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div class="container mx-auto px-4 py-12">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center space-x-8">
            <!-- Company Logo -->
            <div class="w-32 h-32 bg-white rounded-xl shadow-lg flex items-center justify-center p-4">
              <UIcon
                name="i-heroicons-building-office"
                class="w-16 h-16 text-primary-600"
              />
            </div>
            
            <div class="flex-1">
              <h1 class="text-4xl font-bold mb-3">{{ company.company_name }}</h1>
              <div class="flex flex-wrap gap-6 text-white/90">
                <div class="flex items-center">
                  <UIcon name="i-heroicons-briefcase" class="w-5 h-5 mr-2" />
                  {{ company.industry }}
                </div>
                <div class="flex items-center">
                  <UIcon name="i-heroicons-map-pin" class="w-5 h-5 mr-2" />
                  {{ company.location }}
                </div>
                <div class="flex items-center">
                  <UIcon name="i-heroicons-calendar" class="w-5 h-5 mr-2" />
                  Member since {{ formatDate(company.created_at, 'short') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Main Content -->
          <div class="md:col-span-2 space-y-6">
            <!-- About Section -->
            <UCard>
              <template #header>
                <div class="flex items-center justify-between">
                  <h2 class="text-xl font-semibold">About Company</h2>
                  <UBadge color="primary" variant="soft">
                    Verified Company
                  </UBadge>
                </div>
              </template>
              
              <p class="text-gray-600 leading-relaxed">
                {{ company.description }}
              </p>

              <template #footer>
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <span>Last updated: {{ formatDate(company.updated_at) }}</span>
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-share"
                    label="Share"
                  />
                </div>
              </template>
            </UCard>

            <!-- Open Positions -->
            <UCard>
              <template #header>
                <div class="flex items-center justify-between">
                  <h2 class="text-xl font-semibold">Open Positions</h2>
                  <UButton
                    color="primary"
                    variant="soft"
                    icon="i-heroicons-briefcase"
                    to="/jobs"
                    :query="{ company: company.id }"
                  >
                    View All Jobs
                  </UButton>
                </div>
              </template>

              <!-- Sample Job Cards -->
              <div class="space-y-4">
                <div v-for="i in 3" :key="i" class="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-semibold text-lg mb-1">Senior Frontend Developer</h3>
                      <div class="flex items-center gap-4 text-sm text-gray-600">
                        <span class="flex items-center">
                          <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-1" />
                          Remote
                        </span>
                        <span class="flex items-center">
                          <UIcon name="i-heroicons-clock" class="w-4 h-4 mr-1" />
                          Full-time
                        </span>
                      </div>
                    </div>
                    <UButton color="primary" variant="soft" size="sm">
                      Apply Now
                    </UButton>
                  </div>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Quick Stats -->
            <UCard>
              <div class="space-y-4">
                <h3 class="font-semibold">Company Stats</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div class="text-center p-3 bg-gray-50 rounded-lg">
                    <div class="text-2xl font-bold text-primary-600">25+</div>
                    <div class="text-sm text-gray-600">Open Positions</div>
                  </div>
                  <div class="text-center p-3 bg-gray-50 rounded-lg">
                    <div class="text-2xl font-bold text-primary-600">500+</div>
                    <div class="text-sm text-gray-600">Employees</div>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Company Details -->
            <UCard>
              <div class="space-y-4">
                <h3 class="font-semibold">Company Details</h3>
                <div class="space-y-3">
                  <div class="flex items-center text-sm">
                    <UIcon name="i-heroicons-globe-alt" class="w-5 h-5 mr-2 text-gray-400" />
                    <a href="#" class="text-primary-600 hover:underline">Visit Website</a>
                  </div>
                  <div class="flex items-center text-sm">
                    <UIcon name="i-heroicons-building" class="w-5 h-5 mr-2 text-gray-400" />
                    <span>Founded in 2010</span>
                  </div>
                  <div class="flex items-center text-sm">
                    <UIcon name="i-heroicons-users" class="w-5 h-5 mr-2 text-gray-400" />
                    <span>500-1000 employees</span>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Social Links -->
            <UCard>
              <div class="space-y-4">
                <h3 class="font-semibold">Connect With Us</h3>
                <div class="flex justify-around">
                  <UButton
                    v-for="social in ['linkedin', 'twitter', 'facebook']"
                    :key="social"
                    color="gray"
                    variant="ghost"
                    :icon="`i-heroicons-${social}`"
                  />
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const company = ref(null)

// Sample data - replace with API call
  // Simulate API call
  company.value = {
    id: route.params.id,
    company_name: 'TechCorp',
    industry: 'Technology',
    location: 'San Francisco',
    description: "TechCorp is a leading technology company focused on innovative solutions for the digital age. We specialize in creating cutting-edge software products that help businesses transform their operations and achieve their goals. Our team of passionate technologists and creative minds work together to push the boundaries of what's possible in the tech industry.",
    created_at: '2023-01-15T00:00:00Z',
    updated_at: '2024-03-20T00:00:00Z',
    user: 1
  }

const formatDate = (dateString, style = 'long') => {
  const options = style === 'short' 
    ? { year: 'numeric', month: 'short' }
    : { year: 'numeric', month: 'long', day: 'numeric' }
  
  return new Date(dateString).toLocaleDateString('en-US', options)
}
</script> 
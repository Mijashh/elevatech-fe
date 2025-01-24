<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Find Your Next Opportunity</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Filters Sidebar -->
      <div class="md:col-span-1">
        <JobFilter @filter="handleFilter" />
      </div>

      <!-- Jobs List -->
      <div class="md:col-span-3">
        <!-- Search Bar -->
        <div class="mb-6">
          <UInput
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Search jobs..."
            class="w-full"
          />
        </div>

        <!-- Jobs Grid -->
        <div class="space-y-4">
          <UCard
            v-for="job in filteredJobs"
            :key="job.id"
            class="hover:shadow-lg transition-shadow"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h3 class="font-semibold text-lg mb-1">{{ job.title }}</h3>
                <p class="text-gray-600 mb-3">{{ job.company_name }}</p>
                <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span class="flex items-center">
                    <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-1" />
                    {{ job.location }}
                  </span>
                  <span class="flex items-center">
                    <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-1" />
                    Deadline: {{ formatDate(job.deadline) }}
                  </span>
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <UBadge
                    v-for="skill in job.skills"
                    :key="skill"
                    color="primary"
                    variant="soft"
                  >
                    {{ skill }}
                  </UBadge>
                </div>
              </div>
              <UButton 
                color="primary" 
                variant="soft" 
                size="sm"
                @click="handleApply(job)"
              >
                Apply Now
              </UButton>
            </div>
          </UCard>

          <!-- No Results -->
          <div v-if="filteredJobs.length === 0" class="text-center py-8">
            <p class="text-gray-500">No jobs found matching your criteria</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { store } from '~/store/store'

const searchQuery = ref('')
const activeFilters = ref({
  locations: [],
  skills: []
})

const userStore = useStatefulCookie('user-store')

// Sample data - replace with your API call
const jobs = ref([
  {
    id: 1,
    title: 'Frontend Developer',
    company_name: 'TechCorp',
    location: 'Remote',
    skills: ['JavaScript', 'Vue', 'React'],
    deadline: '2024-04-30'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company_name: 'DataSystems',
    location: 'New York',
    skills: ['Python', 'Django', 'PostgreSQL'],
    deadline: '2024-05-15'
  },
  // Add more sample jobs...
])

const handleFilter = (filters) => {
  activeFilters.value = filters
}

const filteredJobs = computed(() => {
  let filtered = jobs.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(job => 
      job.title.toLowerCase().includes(query) ||
      job.company_name.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    )
  }

  // Apply location filter
  if (activeFilters.value.locations.length > 0) {
    filtered = filtered.filter(job => 
      activeFilters.value.locations.includes(job.location)
    )
  }

  // Apply skills filter
  if (activeFilters.value.skills.length > 0) {
    filtered = filtered.filter(job => 
      job.skills.some(skill => activeFilters.value.skills.includes(skill))
    )
  }

  return filtered
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleApply = (job) => {
  if (!userStore.value.token) {
    // User is not logged in, show login modal
    store.isLoginModelOpen = true
    return
  }
  
  // User is logged in, handle job application
  // Add your application logic here
  console.log('Applying for job:', job.title)
}
</script> 
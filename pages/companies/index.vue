<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Companies</h1>

    <!-- Search and Filter Section -->
    <div class="mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search companies..."
          class="w-full"
        />
        <!-- Industry Filter -->
        <USelect
          v-model="selectedIndustry"
          :options="industries"
          placeholder="Select Industry"
          class="w-full"
        />
        <!-- Location Filter -->
        <USelect
          v-model="selectedLocation"
          :options="locations"
          placeholder="Select Location"
          class="w-full"
        />
      </div>
    </div>

    <!-- Companies Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard
        v-for="company in filteredCompanies"
        :key="company.id"
        class="hover:shadow-lg transition-shadow"
        @click="navigateToCompany(company.id)"
      >
        <div class="flex items-start space-x-4">
          <!-- Company Logo Placeholder -->
          <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <UIcon
              name="i-heroicons-building-office"
              class="w-8 h-8 text-gray-400"
            />
          </div>
          
          <div class="flex-1">
            <h3 class="text-xl font-semibold mb-1">{{ company.company_name }}</h3>
            <div class="space-y-1">
              <p class="text-sm text-gray-600 flex items-center">
                <UIcon name="i-heroicons-briefcase" class="w-4 h-4 mr-1" />
                {{ company.industry }}
              </p>
              <p class="text-sm text-gray-600 flex items-center">
                <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-1" />
                {{ company.location }}
              </p>
            </div>
          </div>
          
          <UButton
            color="primary"
            variant="ghost"
            icon="i-heroicons-arrow-right"
            class="self-center"
          />
        </div>
      </UCard>
    </div>

    <!-- No Results -->
    <div v-if="filteredCompanies.length === 0" class="text-center py-8">
      <p class="text-gray-500">No companies found matching your criteria</p>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const searchQuery = ref('')
const selectedIndustry = ref(null)
const selectedLocation = ref(null)

// Sample data - replace with API call
const companies = ref([
  {
    id: 1,
    company_name: 'TechCorp',
    industry: 'Technology',
    location: 'San Francisco'
  },
  {
    id: 2,
    company_name: 'DataSystems',
    industry: 'Software',
    location: 'New York'
  },
  // Add more sample companies...
])

// Unique industries and locations for filters
const industries = computed(() => 
  [...new Set(companies.value.map(company => company.industry))]
)

const locations = computed(() => 
  [...new Set(companies.value.map(company => company.location))]
)

const filteredCompanies = computed(() => {
  let filtered = companies.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(company => 
      company.company_name.toLowerCase().includes(query) ||
      company.industry.toLowerCase().includes(query) ||
      company.location.toLowerCase().includes(query)
    )
  }

  // Apply industry filter
  if (selectedIndustry.value) {
    filtered = filtered.filter(company => 
      company.industry === selectedIndustry.value
    )
  }

  // Apply location filter
  if (selectedLocation.value) {
    filtered = filtered.filter(company => 
      company.location === selectedLocation.value
    )
  }

  return filtered
})

const navigateToCompany = (id) => {
  router.push(`/companies/${id}`)
}
</script> 
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            Explore Opportunities
          </h1>
          <p class="text-xl text-white/90 mb-8">
            Discover your next career move across different industries and roles
          </p>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto">
            <UInput
              v-model="searchQuery"
              icon="i-heroicons-magnifying-glass"
              placeholder="Search jobs, companies, or skills..."
              class="w-full bg-white/10 border-white/20 placeholder-white/70 text-white"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- Popular Categories -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Popular Categories</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UCard
            v-for="category in categories"
            :key="category.name"
            class="hover:shadow-lg transition-all cursor-pointer group"
            @click="navigateToJobs(category)"
          >
            <div class="text-center p-4">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                <UIcon
                  :name="category.icon"
                  class="w-8 h-8 text-primary-600"
                />
              </div>
              <h3 class="font-semibold mb-1">{{ category.name }}</h3>
              <p class="text-sm text-gray-600">{{ category.jobCount }} jobs</p>
            </div>
          </UCard>
        </div>
      </section>

      <!-- Featured Companies -->
      <section class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Featured Companies</h2>
          <UButton
            to="/companies"
            variant="ghost"
            color="primary"
            trailing-icon="i-heroicons-arrow-right"
          >
            View All
          </UButton>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
          <UCard
            v-for="company in featuredCompanies"
            :key="company.id"
            :to="`/companies/${company.id}`"
            class="hover:shadow-lg transition-all"
          >
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <UIcon
                  name="i-heroicons-building-office"
                  class="w-8 h-8 text-gray-400"
                />
              </div>
              <div>
                <h3 class="font-semibold text-lg">{{ company.name }}</h3>
                <p class="text-sm text-gray-600 mb-2">{{ company.industry }}</p>
                <div class="flex items-center text-sm text-gray-500">
                  <UIcon name="i-heroicons-briefcase" class="w-4 h-4 mr-1" />
                  <span>{{ company.openPositions }} open positions</span>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </section>

      <!-- Latest Jobs -->
      <section class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Latest Jobs</h2>
          <UButton
            to="/jobs"
            variant="ghost"
            color="primary"
            trailing-icon="i-heroicons-arrow-right"
          >
            View All
          </UButton>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <UCard
            v-for="job in latestJobs"
            :key="job.id"
            class="hover:shadow-lg transition-all cursor-pointer"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h3 class="font-semibold text-lg mb-1">{{ job.title }}</h3>
                <p class="text-gray-600 mb-3">{{ job.company }}</p>
                <div class="flex flex-wrap gap-2 mb-3">
                  <UBadge
                    v-for="tag in job.tags"
                    :key="tag"
                    color="primary"
                    variant="soft"
                    size="sm"
                  >
                    {{ tag }}
                  </UBadge>
                </div>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span class="flex items-center">
                    <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-1" />
                    {{ job.location }}
                  </span>
                  <span class="flex items-center">
                    <UIcon name="i-heroicons-currency-dollar" class="w-4 h-4 mr-1" />
                    {{ job.salary }}
                  </span>
                </div>
              </div>
              <UButton color="primary" variant="soft" size="sm">
                Apply Now
              </UButton>
            </div>
          </UCard>
        </div>
      </section>

      <!-- Job Insights -->
      <section>
        <h2 class="text-2xl font-bold mb-6">Job Market Insights</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <UCard>
            <div class="text-center p-4">
              <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-50 flex items-center justify-center">
                <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 text-primary-600" />
              </div>
              <h3 class="font-semibold mb-1">Most In-Demand Skills</h3>
              <div class="flex flex-wrap justify-center gap-2 mt-3">
                <UBadge
                  v-for="skill in topSkills"
                  :key="skill"
                  color="primary"
                  variant="soft"
                  size="sm"
                >
                  {{ skill }}
                </UBadge>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="text-center p-4">
              <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-50 flex items-center justify-center">
                <UIcon name="i-heroicons-building-office" class="w-6 h-6 text-primary-600" />
              </div>
              <h3 class="font-semibold mb-1">Top Industries</h3>
              <ul class="mt-3 space-y-2 text-sm text-gray-600">
                <li v-for="industry in topIndustries" :key="industry.name">
                  {{ industry.name }} - {{ industry.growth }}% growth
                </li>
              </ul>
            </div>
          </UCard>

          <UCard>
            <div class="text-center p-4">
              <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-50 flex items-center justify-center">
                <UIcon name="i-heroicons-map" class="w-6 h-6 text-primary-600" />
              </div>
              <h3 class="font-semibold mb-1">Top Locations</h3>
              <ul class="mt-3 space-y-2 text-sm text-gray-600">
                <li v-for="location in topLocations" :key="location.name">
                  {{ location.name }} - {{ location.jobCount }}+ jobs
                </li>
              </ul>
            </div>
          </UCard>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const searchQuery = ref('')

// Sample data
const categories = [
  { name: 'Technology', icon: 'i-heroicons-computer-desktop', jobCount: '1.2k' },
  { name: 'Design', icon: 'i-heroicons-paint-brush', jobCount: '850' },
  { name: 'Marketing', icon: 'i-heroicons-megaphone', jobCount: '650' },
  { name: 'Finance', icon: 'i-heroicons-banknotes', jobCount: '450' },
]

const featuredCompanies = [
  { id: 1, name: 'TechCorp', industry: 'Technology', openPositions: 25 },
  { id: 2, name: 'DesignHub', industry: 'Design', openPositions: 12 },
  { id: 3, name: 'MarketPro', industry: 'Marketing', openPositions: 8 },
]

const latestJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    salary: '$120k - $150k',
    tags: ['Vue.js', 'JavaScript', 'TypeScript']
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'New York',
    salary: '$90k - $120k',
    tags: ['Figma', 'UI Design', 'User Research']
  },
  // Add more jobs...
]

const topSkills = ['JavaScript', 'Python', 'React', 'AWS', 'UI/UX']
const topIndustries = [
  { name: 'Technology', growth: 15 },
  { name: 'Healthcare', growth: 12 },
  { name: 'Finance', growth: 10 }
]
const topLocations = [
  { name: 'San Francisco', jobCount: 1200 },
  { name: 'New York', jobCount: 950 },
  { name: 'London', jobCount: 850 }
]

const navigateToJobs = (category) => {
  // Navigate to jobs page with category filter
  navigateTo({
    path: '/jobs',
    query: { category: category.name.toLowerCase() }
  })
}
</script> 
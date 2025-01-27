<script setup>
const route = useRoute()
const router = useRouter()
const toast = useToast()
const isApplying = ref(false)

// Fetch job details
const { data: job, pending, error, refresh } = await useApi(`/jobs/${route.params.id}/`)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const handleApply = async () => {
  const userStore = useStatefulCookie('user-store')

  if (!userStore.value?.token) {
    toast.add({
      title: 'Login Required',
      description: 'Please login to apply for this job',
      color: 'orange',
    })
    store.isLoginModelOpen = true
    return
  }

  try {
    isApplying.value = true
    await useApi(`/jobs/${route.params.id}/apply/`, {
      method: 'POST',
    })

    toast.add({
      title: 'Success!',
      description: 'Your application has been submitted',
      color: 'green',
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: error.message || 'Failed to submit application',
      color: 'red',
    })
  } finally {
    isApplying.value = false
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Back Button -->
    <UButton
      icon="i-heroicons-arrow-left"
      variant="ghost"
      class="mb-6"
      @click="router.back()"
    >
      Back to Jobs
    </UButton>

    <UCard v-if="job">
      <!-- Header Section -->
      <div class="border-b pb-6 mb-6">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-bold mb-2">
              {{ job.title }}
            </h1>
            <div class="flex items-center gap-4 text-gray-600">
              <span class="flex items-center">
                <UIcon name="i-heroicons-building-office" class="w-5 h-5 mr-1" />
                {{ job.company_name }}
              </span>
              <span class="flex items-center">
                <UIcon name="i-heroicons-map-pin" class="w-5 h-5 mr-1" />
                {{ job.location }}
              </span>
            </div>
          </div>
          <UButton
            color="primary"
            :loading="isApplying"
            @click="handleApply"
          >
            Apply Now
          </UButton>
        </div>

        <!-- Timeline Info -->
        <div class="flex gap-6 mt-4 text-sm text-gray-500">
          <span class="flex items-center">
            <UIcon name="i-heroicons-clock" class="w-4 h-4 mr-1" />
            Posted: {{ formatDate(job.posted_at) }}
          </span>
          <span class="flex items-center">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-1" />
            Deadline: {{ formatDate(job.deadline) }}
          </span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Left Column: Description & Requirements -->
        <div class="md:col-span-2 space-y-6">
          <!-- Description -->
          <div>
            <h2 class="text-xl font-semibold mb-3">
              Job Description
            </h2>
            <div class="prose max-w-none text-gray-600">
              {{ job.description }}
            </div>
          </div>

          <!-- Requirements -->
          <div>
            <h2 class="text-xl font-semibold mb-3">
              Requirements
            </h2>
            <div class="prose max-w-none text-gray-600">
              {{ job.requirements }}
            </div>
          </div>
        </div>

        <!-- Right Column: Skills & Additional Info -->
        <div class="md:col-span-1">
          <div class="sticky top-4 space-y-6">
            <!-- Skills -->
            <div>
              <h3 class="text-lg font-semibold mb-3">
                Required Skills
              </h3>
              <div class="flex flex-wrap gap-2">
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

            <!-- Company Info Card -->
            <UCard>
              <template #header>
                <h3 class="font-semibold">
                  About {{ job.company_name }}
                </h3>
              </template>
              <p class="text-sm text-gray-600">
                View company profile for more information about {{ job.company_name }}
              </p>
              <template #footer>
                <UButton
                  color="gray"
                  variant="ghost"
                  :to="`/companies/${job.company}`"
                  block
                >
                  View Company Profile
                </UButton>
              </template>
            </UCard>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Loading State -->
    <div v-else-if="pending" class="flex justify-center py-12">
      <ULoadingIcon />
    </div>

    <!-- Error State -->
    <UCard v-else-if="error" class="text-center py-12">
      <p class="text-gray-600">
        Failed to load job details
      </p>
      <UButton class="mt-4" @click="refresh">
        Try Again
      </UButton>
    </UCard>
  </div>
</template>

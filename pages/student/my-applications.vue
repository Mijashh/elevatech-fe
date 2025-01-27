<script setup>
const { data: applications, pending } = await useApi('/applications/')

const getStatusColor = (status) => {
  const statusColors = {
    pending: 'yellow',
    accepted: 'green',
    rejected: 'red',
    shortlisted: 'blue',
  }
  return statusColors[status] || 'gray'
}

const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">
        My Applications
      </h1>
      <UButton
        to="/jobs"
        color="primary"
        variant="ghost"
        icon="i-heroicons-briefcase"
      >
        Browse Jobs
      </UButton>
    </div>

    <!-- Applications List -->
    <UCard v-if="applications?.length">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-gray-600">
            {{ applications.length }} Application{{ applications.length !== 1 ? 's' : '' }}
          </span>
          <!-- Optional: Add filters here -->
        </div>
      </template>

      <div class="divide-y">
        <div
          v-for="application in applications"
          :key="application.id"
          class="py-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex justify-between items-start">
            <!-- Job Info -->
            <div class="flex-1">
              <ULink
                :to="`/jobs/${application.job.id}`"
                class="text-lg font-semibold text-primary hover:underline"
              >
                {{ application.job.title }}
              </ULink>

              <div class="mt-1 space-y-1">
                <div class="flex items-center text-gray-600">
                  <UIcon name="i-heroicons-building-office" class="w-4 h-4 mr-1" />
                  {{ application.job.company_name }}
                </div>
                <div class="flex items-center text-gray-600">
                  <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-1" />
                  {{ application.job.location }}
                </div>
              </div>
            </div>

            <!-- Application Status & Date -->
            <div class="text-right">
              <UBadge
                :color="getStatusColor(application.status)"
                class="mb-2"
              >
                {{ formatStatus(application.status) }}
              </UBadge>
              <div class="text-sm text-gray-500">
                Applied {{ formatDate(application.applied_at) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Empty State -->
    <UCard v-else-if="!pending" class="text-center py-12">
      <UIcon name="i-heroicons-document-text" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        No Applications Yet
      </h3>
      <p class="text-gray-600 mb-6">
        Start your journey by applying to jobs that match your skills.
      </p>
      <UButton
        to="/jobs"
        color="primary"
      >
        Browse Jobs
      </UButton>
    </UCard>

    <!-- Loading State -->
    <div v-else class="flex justify-center py-12">
      <ULoadingIcon />
    </div>
  </div>
</template>

<style scoped>
.divide-y > div:first-child {
  padding-top: 0;
}

.divide-y > div:last-child {
  padding-bottom: 0;
}
</style>

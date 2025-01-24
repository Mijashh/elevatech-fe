<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4">Filters</h3>
    
    <!-- Location Filter -->
    <div class="mb-6">
      <h4 class="font-medium mb-2">Location</h4>
      <div class="space-y-2">
        <div v-for="location in locations" :key="location" class="flex items-center">
          <UCheckbox
            v-model="selectedLocations"
            :value="location"
            :label="location"
            @change="emitFilters"
          />
        </div>
      </div>
    </div>

    <!-- Skills Filter -->
    <div class="mb-6">
      <h4 class="font-medium mb-2">Skills</h4>
      <div class="space-y-2">
        <div v-for="skill in skills" :key="skill" class="flex items-center">
          <UCheckbox
            v-model="selectedSkills"
            :value="skill"
            :label="skill"
            @change="emitFilters"
          />
        </div>
      </div>
    </div>

    <!-- Clear Filters -->
    <UButton
      v-if="hasActiveFilters"
      color="gray"
      variant="soft"
      block
      @click="clearFilters"
    >
      Clear Filters
    </UButton>
  </div>
</template>

<script setup>
const selectedLocations = ref([])
const selectedSkills = ref([])

// These would typically come from your API
const locations = ref(['Remote', 'New York', 'San Francisco', 'London'])
const skills = ref(['JavaScript', 'Python', 'React', 'Vue', 'Django'])

const hasActiveFilters = computed(() => {
  return selectedLocations.value.length > 0 || selectedSkills.value.length > 0
})

const emit = defineEmits(['filter'])

const emitFilters = () => {
  emit('filter', {
    locations: selectedLocations.value,
    skills: selectedSkills.value
  })
}

const clearFilters = () => {
  selectedLocations.value = []
  selectedSkills.value = []
  emitFilters()
}
</script> 
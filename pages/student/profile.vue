<script setup>
const toast = useToast()
const isLoading = ref(false)
const userStore = useStatefulCookie('user-store')
console.log(userStore.value.user.student_id)

const educationOptions = [
  { label: 'Computer Science and Information Technology', value: 'CSIT' },
  { label: 'Bachelor in Information Technology', value: 'BIT' },
  { label: 'Bachelor in Computer Application', value: 'BCA' },
  { label: 'Bachelor in Information Management', value: 'BIM' },
]

const skillOptions = [
  { label: 'Frontend Development', value: 'Frontend' },
  { label: 'Backend Development', value: 'Backend' },
  { label: 'Mobile Development', value: 'Mobile' },
  { label: 'Database Management', value: 'Database' },
  { label: 'DevOps', value: 'DevOps' },
  { label: 'Artificial Intelligence/Machine Learning', value: 'AI/ML' },
  { label: 'Graphics Design', value: 'Graphics' },
  { label: 'Digital Marketing', value: 'Digital Marketing' },
]

const experienceOptions = [
  { label: '6 Months', value: '6' },
  { label: '12 Months', value: '12' },
  { label: '18 Months', value: '18' },
  { label: '24 Months', value: '24' },
]

// Initialize form with empty values
const form = reactive({
  full_name: '',
  education: '',
  skills: [],
  experience: '',
  location: '',
})

// Fetch initial profile data
onMounted(async () => {
  try {
    const { data } = await useApi(`/students/${userStore.value.user.student_id}/`)
    if (data.value) {
      form.full_name = data.value.full_name
      form.education = data.value.education
      form.skills = data.value.skills
      form.experience = data.value.experience
      form.location = data.value.location
    }
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to load profile data',
      color: 'red',
    })
  }
})

const handleSubmit = async () => {
  try {
    isLoading.value = true
    await useApi(`/students/${userStore.value.user.student_id}/`, {
      method: 'PUT',
      body: form,
    })

    toast.add({
      title: 'Success',
      description: 'Profile updated successfully',
      color: 'green',
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: error.message || 'Failed to update profile',
      color: 'red',
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold">
          My Profile
        </h1>
      </template>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Full Name -->
        <UFormGroup label="Full Name" required>
          <UInput
            v-model="form.full_name"
            placeholder="Enter your full name"
          />
        </UFormGroup>

        <!-- Education -->
        <UFormGroup label="Education" required>
          <USelect
            v-model="form.education"
            :options="educationOptions"
            placeholder="Select your education"
          />
        </UFormGroup>

        <!-- Skills -->
        <UFormGroup label="Skills" required>
          <USelectMenu
            v-model="form.skills"
            :options="skillOptions"
            option-attribute="label"
            value-attribute="value"
            multiple
            placeholder="Select your skills"
          />
        </UFormGroup>

        <!-- Experience -->
        <UFormGroup label="Experience" required>
          <USelect
            v-model="form.experience"
            :options="experienceOptions"
            placeholder="Select your experience"
          />
        </UFormGroup>

        <!-- Location -->
        <UFormGroup label="Location" required>
          <UInput
            v-model="form.location"
            placeholder="Enter your location"
          />
        </UFormGroup>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <UButton
            type="submit"
            color="primary"
            :loading="isLoading"
          >
            Save Profile
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>

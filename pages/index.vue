<template>
    <main>
      <!-- Hero Section -->
      <section class="bg-gradient-to-b from-gray-50 to-white py-20">
        <div class="container mx-auto px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="space-y-8">
              <h1 class="text-4xl md:text-5xl font-bold text-gray-900">
                Connect Your Future with 
                <span class="text-primary">Digital Profiling</span>
              </h1>
              <p class="text-lg text-gray-600">
                Create your professional profile, showcase your skills, and connect with leading companies. 
                Your perfect career match is just a profile away.
              </p>
              <div class="flex flex-wrap gap-4">
                <UButton
                  size="lg"
                  color="primary"
                  to="/register?type=student"
                  icon="i-heroicons-user-plus"
                >
                  Create Profile
                </UButton>
                <UButton
                  size="lg"
                  color="gray"
                  variant="soft"
                  to="/register?type=company"
                  icon="i-heroicons-building-office"
                >
                  For Companies
                </UButton>
              </div>
            </div>
            <div class="hidden md:block">
              <UIcon
                name="i-heroicons-user-circle"
                class="w-full h-80 text-primary opacity-90"
              />
            </div>
          </div>
        </div>
      </section>
  
      <!-- Stats Section -->
      <section class="py-12 bg-gray-50">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">5000+</div>
              <div class="text-gray-600">Student Profiles</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">200+</div>
              <div class="text-gray-600">Partner Companies</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">1000+</div>
              <div class="text-gray-600">Job Matches</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">95%</div>
              <div class="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Features Section -->
      <section class="py-20">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <UCard>
              <template #header>
                <UIcon name="i-heroicons-user-circle" class="w-12 h-12 text-primary" />
                <h3 class="text-xl font-semibold mt-4">Create Profile</h3>
              </template>
              <p class="text-gray-600">
                Build your digital profile showcasing your skills, education, and achievements.
              </p>
            </UCard>
  
            <UCard>
              <template #header>
                <UIcon name="i-heroicons-rectangle-stack" class="w-12 h-12 text-primary" />
                <h3 class="text-xl font-semibold mt-4">Match Jobs</h3>
              </template>
              <p class="text-gray-600">
                Our AI-powered system matches your profile with relevant job opportunities.
              </p>
            </UCard>
  
            <UCard>
              <template #header>
                <UIcon name="i-heroicons-briefcase" class="w-12 h-12 text-primary" />
                <h3 class="text-xl font-semibold mt-4">Get Hired</h3>
              </template>
              <p class="text-gray-600">
                Connect directly with companies and land your dream job.
              </p>
            </UCard>
          </div>
        </div>
      </section>
  
      <!-- CTA Section -->
      <section class="bg-primary py-20">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p class="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students and companies already using our platform
            to build meaningful career connections.
          </p>
          <div class="flex justify-center gap-4">
            <UButton
              color="white"
              size="lg"
              to="/register"
            >
              Get Started
            </UButton>
            <UButton
              color="white"
              variant="ghost"
              size="lg"
              to="/about"
            >
              Learn More
            </UButton>
          </div>
        </div>
      </section>
  
      <!-- Latest Jobs Section -->
      <section class="py-20">
        <div class="container mx-auto px-6">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold">Latest Opportunities</h2>
            <UButton
              color="gray"
              variant="ghost"
              to="/jobs"
              icon="i-heroicons-arrow-right"
              icon-right
            >
              View All Jobs
            </UButton>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            <UCard v-for="job in latestJobs" :key="job.id">
              <template #header>
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-semibold text-lg">{{ job.title }}</h3>
                    <p class="text-gray-600">{{ job.company }}</p>
                  </div>
                  <UBadge :color="job.badgeColor">{{ job.type }}</UBadge>
                </div>
              </template>
              <p class="text-gray-600">{{ job.description }}</p>
              <template #footer>
                <UButton
                  color="primary"
                  variant="soft"
                  :to="`/jobs/${job.id}`"
                  block
                >
                  View Details
                </UButton>
              </template>
            </UCard>
          </div>
        </div>
      </section>
    </main>
  </template>
  
  <script setup>
  const latestJobs = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Corp',
      type: 'Full-time',
      badgeColor: 'primary',
      description: 'Looking for a talented software engineer with experience in Vue.js and Node.js.'
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Design Studio',
      type: 'Remote',
      badgeColor: 'green',
      description: 'Join our creative team as a UX designer and help shape amazing digital experiences.'
    },
    {
      id: 3,
      title: 'Data Analyst Intern',
      company: 'Data Solutions',
      type: 'Internship',
      badgeColor: 'yellow',
      description: 'Great opportunity for students interested in data analysis and visualization.'
    }
  ]
  </script>
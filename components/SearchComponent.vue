<template>
  <div class="relative text-gray-600">
    <search-focus @keyup="focusSearch" />

    <input
      ref="searchEl"
      v-model="query"
      type="text"
      name="search"
      placeholder="Search colleges, courses, schools ..."
      class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm outline-none focus:border-blue-500 w-full header-search-input"
      @blur="searchResultsVisible = false"
      @focus="searchResultsVisible = true"
      @keydown.esc="searchResultsVisible = false"
      @input="softReset"
      @keyup="performSearch"
      @keydown.up.prevent="highlightPrevious"
      @keydown.down.prevent="highlightNext"
      @keydown.enter="gotoLink"
    >

    <button
      type="submit"
      class="absolute right-0 top-0 mt-2 mr-4"
      aria-label="Search"
      @click="searchResultsVisible = true"
    >
      <Icon name="material-symbols:search" />
    </button>

    <div
      v-if="query.length > 0"
      title="Clear search query"
      class="absolute top-1/2 -translate-y-1/2 right-0 text-2xl mr-10 cursor-pointer text-gray-600 hover:text-gray-800"
      @click="reset"
    >
      &times;
    </div>

    <transition name="fade">
      <div
        v-if="query.length > 0 && searchResultsVisible"
        class="absolute normal-case bg-white border left-0 right-0 w-108 text-left mb-4 mt-2 rounded-lg shadow z-40"
      >
        <div class="overflow-hidden overflow-y-auto" style="max-height: 32rem">
          <div ref="resultsEl" class="flex flex-col">
            <NuxtLink
              :to="`/institution/?q=${query}`"
              class="border-b cursor-pointer px-4 py-2 hover:bg-blue-100"
              :class="{ 'bg-blue-100': highlightedIndex === 0 }"
              @mousedown.prevent="itemMouseDown"
              @click="itemClicked(0)"
            >
              Search <strong>{{ query }}</strong> in
              <em>Colleges and Schools</em>

              <span class="block font-normal text-xs text-gray-600 my-1"
                >Search across colleges, schools, and institutions in
                Nepal</span
              >
            </NuxtLink>
            <NuxtLink
              :to="`/college/?q=${query}`"
              class="border-b cursor-pointer px-4 py-2 hover:bg-blue-100"
              :class="{ 'bg-blue-100': highlightedIndex === 1 }"
              @mousedown.prevent="itemMouseDown"
              @click="itemClicked(1)"
            >
              Search <strong>{{ query }}</strong> in <em>Colleges</em>

              <span class="block font-normal text-xs text-gray-600 my-1"
                >Search across colleges in Nepal</span
              >
            </NuxtLink>

            <NuxtLink
              :to="`/school/?q=${query}`"
              class="border-b cursor-pointer px-4 py-2 hover:bg-blue-100"
              :class="{ 'bg-blue-100': highlightedIndex === 2 }"
              @mousedown.prevent="itemMouseDown"
              @click="itemClicked(2)"
            >
              Search <strong>{{ query }}</strong> in <em>Schools</em>
            </NuxtLink>

            <NuxtLink
              :to="`/course/?q=${query}`"
              class="border-b cursor-pointer px-4 py-2 hover:bg-blue-100"
              :class="{ 'bg-blue-100': highlightedIndex === 3 }"
              @mousedown.prevent="itemMouseDown"
              @click="itemClicked(3)"
            >
              Search <strong>{{ query }}</strong> in <em>Courses</em>
            </NuxtLink>

            <NuxtLink
              v-for="(item, index) in searchResults"
              :key="index"
              :to="item.path"
              class="border-b cursor-pointer px-4 py-2 hover:bg-blue-100"
              :class="{
                'bg-blue-100': staticCount + index === highlightedIndex,
              }"
              @mousedown.prevent="itemMouseDown"
              @click="itemClicked(staticCount + index)"
            >
              {{ item.title }}

              <span class="block font-normal text-xs my-1">{{
                item.summary
              }}</span>
            </NuxtLink>

            <!-- <div
              v-if="searchResults.length === 0"
              class="font-normal w-full border-b cursor-pointer p-4"
            >
              <p class="my-0">
                No results for '<strong>{{ query }}</strong
                >'
              </p>
            </div> -->
          </div>
        </div>
        <div class="block bg-gray-100 text-sm p-2 rounded-b-lg">
          Tip: Press "/" to focus on search!
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SearchFocus from './SearchFocus'
export default {
  components: {
    SearchFocus,
  },
  setup() {
    const query = ref('')
    const searchResults = ref([])
    const highlightedIndex = ref(0)
    const searchResultsVisible = ref(false)
    const resultsEl = ref(null)
    const searchEl = ref(null)
    const staticCount = 4

    const router = useRouter()
    const route = useRoute()
    // const { $fb } = useContext()

    const getSearchSuggestions = (query) => {
      const suggestions = [
        // {
        //   title: `Search ${query} in Colleges`,
        //   path: `/college/?q=${query}`,
        //   // icon: 'Search across all colleges in Nepal',
        // },
        // {
        //   title: `Search ${query} in Schools`,
        //   path: `/school/?q=${query}`,
        //   summary: 'Search across all schools in Nepal',
        // },
        // {
        //   title: `Search ${query} in Courses`,
        //   path: `/course/?q=${query}`,
        // },
      ]
      return suggestions
    }

    const performSearch = (visible = true) => {
      searchResults.value = getSearchSuggestions(query.value)
      // if (visible) {
      //   searchResultsVisible.value = true
      // }
    }

    if (route.query.q) {
      query.value = route.query.q
      performSearch(false)
      // if ($fb && $fb.track) {
      //   $fb.track('Search', { search_string: route.query.q })
      // }
    }

    const itemMouseDown = () => {
      searchResultsVisible.value = true
    }

    const itemClicked = (index) => {
      console.log(index)
      highlightedIndex.value = index
    }

    const gotoLink = () => {
      if (highlightedIndex.value >= staticCount) {
        if (searchResults.value[highlightedIndex.value - staticCount]) {
          router.push(
            searchResults.value[highlightedIndex.value - staticCount].path
          )
        }
      } else {
        const href =
          resultsEl.value.children[highlightedIndex.value].getAttribute('href')
        if (href) {
          router.push(href)
        }
      }
      searchResultsVisible.value = false
      // $fb.track('Search', { search_string: query.value })
    }

    const scrollIntoView = () => {
      if (resultsEl.value) {
        resultsEl.value.children[highlightedIndex.value].scrollIntoView({
          block: 'nearest',
        })
      }
    }

    const highlightPrevious = () => {
      if (highlightedIndex.value > 0) {
        highlightedIndex.value = highlightedIndex.value - 1
        scrollIntoView()
      }
    }

    const highlightNext = () => {
      if (
        highlightedIndex.value <
        searchResults.value.length + staticCount - 1
      ) {
        highlightedIndex.value = highlightedIndex.value + 1
        scrollIntoView()
      }
    }

    const reset = () => {
      query.value = ''
      highlightedIndex.value = 0
    }

    const softReset = () => {
      searchResultsVisible.value = true
      highlightedIndex.value = 0
    }

    const focusSearch = (e) => {
      if (
        e.key === '/' &&
        e.target?.tagName !== 'INPUT' &&
        e.target?.tagName !== 'TEXTAREA'
      ) {
        searchEl.value.focus()
      }
    }

    return {
      query,
      searchResults,
      highlightedIndex,
      searchResultsVisible,
      staticCount,
      itemMouseDown,
      itemClicked,
      performSearch,
      gotoLink,
      highlightPrevious,
      highlightNext,
      reset,
      softReset,
      focusSearch,
      searchEl,
      resultsEl,
    }
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

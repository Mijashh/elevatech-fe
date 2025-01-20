import { joinURL, withQuery } from 'ufo'

function cleanFilters(obj: Record<string, string>) {
  const newObj: Record<string, string | number > = {}
  Object.keys(obj).forEach((key) => {
    const numKey: number = Number.parseInt(obj[key])
    if (Number.isNaN(numKey)) {
      newObj[key] = obj[key]
    } else {
      newObj[key] = numKey
    }
  })
  return newObj
}
export const useList = (endpoint: string) => {
  const route = useRoute()
  const router = useRouter()
  const query = route.query
  const page = ref(query.page ? Number(query.page) : 1)
  delete query.page
  const filters = ref(cleanFilters(query))
  const isLoading = ref(true)
  const url = joinURL(withQuery(endpoint, { page: page.value || undefined, ...filters.value }))
  interface listType {
    results: Record<string, any>[]
    pagination: {
      total: number
      page: number
      size: number
      pages: number
    }
  }
  const data: Ref<listType | null> = ref(null)
  useApi<listType>(url).then(({ data: res }) => {
    data.value = res.value
    isLoading.value = false
  }).finally(() => {
    isLoading.value = false
  })
  // inital fetch
  const onFilterUpdate = () => {
    isLoading.value = true
    const fetchUrl = withQuery(endpoint, { page: undefined, ...filters.value })
    useApi(fetchUrl).then(({ data: res }) => {
      data.value = res.value
      isLoading.value = false
    }).finally(() => {
      isLoading.value = false
    })
    router.push({ query: { ...filters.value } })
    page.value = 1
  }
  const onFilterReset = () => {
    filters.value = { search: null }
    onFilterUpdate()
  }

  // TODO: Add clean Filters

  const onPageChange = (page: string) => {
    const query = { ...route.query }
    query.page = page
    router.push(withQuery(route.path, query))
  }
  watch(page, (newVal) => {
    if (newVal) {
      isLoading.value = true
      const currentQuery = { ...route.query } as Record<string, any>
      currentQuery.page = newVal
      const fetchUrl = withQuery(endpoint, currentQuery)
      useApi(fetchUrl).then(({ data: res }) => {
        data.value = res.value
        isLoading.value = false
      }).finally(() => {
        isLoading.value = false
      })
      router.push(withQuery(route.path, currentQuery))
    }
  })
  return {
    filters,
    data,
    onFilterUpdate,
    onFilterReset,
    isLoading,
    onPageChange,
    page,
  }
}

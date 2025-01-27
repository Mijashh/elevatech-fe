import { useFetch } from '#app'
import { joinURL, parseURL } from 'ufo'

type UseFetchOptions = Parameters<typeof useFetch>[1]

type UseAPIOptions = UseFetchOptions & {
  handleErrors?: boolean
}

export const useApi: typeof useFetch = (
  request,
  opts: UseAPIOptions = {},
) => {
  const config = useRuntimeConfig()
  const { ...options } = opts
  const path = parseURL(request).pathname
  const baseURL = config.public.api.baseURL
  request = joinURL(baseURL, request)

  return useFetch(request, {
    onRequest: async ({ request, options }) => {
      let store
      if (path.includes('/api/admin')) {
        store = useStatefulCookie('admin-user-store')
      } else {
        store = useStatefulCookie('user-store')
      }
      if (store?.value?.token) {
        options.headers.set('Authorization', `Bearer ${store.value.token}`)
      }
    },

    onResponseError: async ({ response }) => {
      // // Handle 401 and 403 errors in case of stale token
      if ([401, 403].includes(response.status)) {
        // const { fetch } = useUserSession()
        let store
        if (path.includes('/api/admin')) {
          store = useStatefulCookie('admin-user-store')
        } else {
          store = useStatefulCookie('user-store')
        }
        store.value = {}
        await navigateTo('/')
      }
    },
    ...options,
  })
}

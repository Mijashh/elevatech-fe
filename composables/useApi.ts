import { useFetch } from '#app'
import { parseURL, joinURL } from 'ufo'

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
        options.headers = {
          Authorization: `Bearer ${store.value.token}`,
        }
      }
      if (!store.value?.token) return
      const { expiresAt, refreshToken, token } = store.value
      if (expiresAt
        && !(['/api/auth/refresh-token', '/api/auth/logout'].includes(request))
        && checkDateExpiry(expiresAt, 10 * 60 * 1000)
      ) {
        const { data, error } = await useFetch('/api/auth/refresh-token', {
          method: 'POST',
          body: {
            token: refreshToken,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (data.value) {
          store.value.token = data.value?.token
          store.value.refreshToken = data.value?.newRefreshToken
          store.value.expiresAt = data.value?.expiresAt
          options.headers = {
            Authorization: `Bearer ${data.value?.token}`,
          }
        } else if (error.value && error.value.data.statusCode === 401) {
          store.value = {}
          await navigateTo('/')
        }
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

import type { AppConfig } from '@nuxt/ui/dist/runtime/types'

export default defineAppConfig(<AppConfig>{
  ui: {
    primary: 'brand',
    gray: 'slate',
    variables: {
      light: {
        background: '245 249 250',
        foreground: '14 25 32',
      },
      dark: {
        background: '5 9 10',
        foreground: '223 234 241',
      },
    },
    icons: {
      dark: 'i-heroicons-moon',
      light: 'i-heroicons-sun',
      search: 'i-heroicons-magnifying-glass',
      external: 'i-heroicons-arrow-up-right',
      chevron: 'i-heroicons-chevron-down',
      hash: 'i-heroicons-hashtag',
      cart: 'i-heroicons-shopping-cart',
    },
    presets: {
      button: {
        default: {
          loading: {
            loadingIcon: 'i-heroicons-arrow-path',
          },
        },
        primary: {
          color: 'white',
          variant: 'solid',
        },
        secondary: {
          color: 'gray',
          variant: 'ghost',
        },
        input: {
          color: 'white',
          variant: 'outline',
          ui: {
            font: '',
            color: {
              white: {
                outline: 'ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:ring-gray-300 dark:hover:ring-gray-700 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible-ring-primary-400',
              },
            },
          },
        },
      },
    },
    container: {
      constrained: 'max-w-screen-2xl',
    },
    header: {
      wrapper: 'lg:mb-0 lg:border-0',
    },
    badge: {
      rounded: 'rounded-full',
    },
    notifications: {
      position: 'top-auto bottom-0 text-white',
    },
    notification: {
      title: 'text-white font-semibold',
      progress: {
        background: 'bg-white/80',
      },
      shadow: 'drop-shadow-md shadow-none ',
      // TODO: Find better way
      default: {
        closeButton: {
          color: 'white',
        },
      },
    },
    button: {
      variant: {
        send_as_gift: 'text-gray-600 hover:text-gray-600 disabled:text-gray-600 dark:text-gray-400 dark:hover:text-gray-600 dark:disabled:text-gray-500 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-600 dark:focus-visible:ring-gray-500',
      },
    },
    // formGroup: {
    //   default:{
    //     size: 'xl',
    //   }
    // },
  },
})

import { joinURL } from 'ufo'

import type { ComponentInternalInstance } from '@vue/runtime-dom'

interface UseFormConfig {
  redirect?: boolean
  successMessage?: string
  editingId?: number | string
}

export async function useForm<T extends Record<string, any>>(endpoint: string, config: UseFormConfig = {
  redirect: true,
}) {
  const url = ref(endpoint)
  const route = useRoute()
  // const toast = useToast()

  const root:
  | (ComponentInternalInstance & {
    setupContext?: { emit: (signal: string, ...rest: any) => void }
  })
  | null = getCurrentInstance()
  const formContext = root?.setupContext

  const { id } = route.params as {
    id: string | undefined
  }

  const isFormSubmitting = ref(false)

  const editingId = config.editingId

  if (editingId) {
    url.value = joinURL(endpoint, editingId.toString())
  }

  async function fetchInitialData() {
    const { data: response } = await useApi(url.value)

    return response
  }

  const fields = (editingId ? await fetchInitialData() : ref({})) as Ref<T>


  async function submitForm() {
    if (isFormSubmitting.value) return
    isFormSubmitting.value = true
    const { data, error } = await useApi(url.value, {
      method: editingId ? 'PATCH' : 'POST',
      body: { ...fields.value },
    })
    isFormSubmitting.value = false
    return { data, error }
  }

  return {
    fields,
    submitForm,
    isFormSubmitting,
    editingId,
  }
}

import { ref, provide, inject } from 'vue'

const NAV_KEY = Symbol('navigation')

export function createNavigation() {
  const title = ref('My App')
  const icon = ref('')
  const status = ref('')

  function setTitle(newTitle: string) {
    title.value = newTitle
  }
  function setIcon(newIcon: string) {
    icon.value = newIcon
  }
  function setStatus(newStatus: string) {
    status.value = newStatus
  }

  provide(NAV_KEY, { title, icon, status, setTitle, setIcon, setStatus })
  return { title, icon, status, setTitle, setIcon, setStatus }
}

export function useNavigation() {
  const nav = inject<{ 
    title: typeof ref, 
    icon: typeof ref, 
    status: typeof ref, 
    setTitle: (t: string) => void, 
    setIcon: (i: string) => void, 
    setStatus: (s: string) => void 
  }>(NAV_KEY)
  if (!nav) throw new Error('Navigation not provided')
  return nav
}
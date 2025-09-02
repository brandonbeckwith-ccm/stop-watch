import { ref, provide, inject, type Ref, nextTick } from 'vue'

export interface NavigationService {
  title: Ref<string>
  icon: Ref<string>
  status: Ref<string>
  setTitle: (title: string) => void
  setIcon: (icon: string) => void
  setStatus: (status: string) => void
  reset: () => void
}

const NavigationKey = Symbol('navigation')

const defaultNavigation: NavigationService = {
  title: ref(''),
  icon: ref(''),
  status: ref(''),
  setTitle: () => {},
  setIcon: () => {},
  setStatus: () => {},
  reset: () => {}
}

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: number | null = null;
  return ((...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export function provideNavigation(): NavigationService {
  const title = ref('')
  const icon = ref('')
  const status = ref('')

  const debouncedSetStatus = debounce(async (newStatus: string) => {
    status.value = newStatus
    await nextTick()
  }, 100)

  const navigationService: NavigationService = {
    title,
    icon,
    status,
    setTitle: async (newTitle: string) => {
      title.value = newTitle
      await nextTick()
    },
    setIcon: async (newIcon: string) => {
      icon.value = newIcon
      await nextTick()
    },
    setStatus: async (newStatus: string) => {
      debouncedSetStatus(newStatus)
    },
    reset: async () => {
      title.value = ''
      icon.value = ''
      status.value = ''
      await nextTick()
    }
  }

  provide(NavigationKey, navigationService)
  return navigationService
}

export function useNavigation(): NavigationService {
  const navigation = inject(NavigationKey, defaultNavigation)
  return navigation
}
import { ref, provide, inject} from 'vue'
import type { InjectionKey, Ref } from 'vue'
export interface NavigationState {
  title: string
  icon: string
  status?: string
  statusType?: 'info' | 'success' | 'warning' | 'error'
}

export interface NavigationService {
  currentPage: Ref<NavigationState>
  setPageInfo: (info: Partial<NavigationState>) => void
  setStatus: (status: string, type?: NavigationState['statusType']) => void
  clearStatus: () => void
}

export const NavigationKey: InjectionKey<NavigationService> = Symbol('navigation')
export function useNavigationProvider() {
  const currentPage = ref<NavigationState>({
    title: 'Home',
    icon: '🏠',
    status: 'Welcom to the application',
    statusType: 'info'
  })

  const setPageInfo = (info: Partial<NavigationState>) => {
    currentPage.value = {
      ...currentPage.value,
      ...info
    }
  }

  const setStatus = (status: string, type: NavigationState['statusType'] = 'info') => {
    currentPage.value.status = status
    currentPage.value.statusType = type
  }

  const clearStatus = () => {
    currentPage.value.status = undefined
    currentPage.value.statusType = undefined
  }

  const navigationService: NavigationService = {
    currentPage,
    setPageInfo,
    setStatus,
    clearStatus
  }

  provide(NavigationKey, navigationService)

  return navigationService
}

export function useNavigation() {
  const navigationService = inject(NavigationKey)
  
  if (!navigationService) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  
  return navigationService
}
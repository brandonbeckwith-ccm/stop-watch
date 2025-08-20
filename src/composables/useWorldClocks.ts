import type { Ref } from 'vue'
import { useNow, useLocalStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export type ClockEntry = {
  id: string
  label: string
  tz: string
}

const now = useNow({ interval: 1000 })

const defaultClocks: ClockEntry[] = [
  {
    id: 'local',
    label: 'Local Time',
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
  {
    id: 'est',
    label: 'Eastern Time (ET)',
    tz: 'America/New_York',
  },
  {
    id: 'utc',
    label: 'UTC',
    tz: 'UTC',
  },
]

export const popularTimezones =[
    { id: 'utc', label: 'UTC', tz: 'UTC' },
    { id: 'pst', label: 'Pacific Time (PT)', tz: 'America/Los_Angeles' },
    { id: 'mst', label: 'Mountain Time (MT)', tz: 'America/Denver' },
    { id: 'cst', label: 'Central Time (CT)', tz: 'America/Chicago' },
    { id: 'est', label: 'Eastern Time (ET)', tz: 'America/New_York' },
    
    // International Major Cities
    { id: 'london', label: 'London', tz: 'Europe/London' },
    { id: 'paris', label: 'Paris', tz: 'Europe/Paris' },
    { id: 'berlin', label: 'Berlin', tz: 'Europe/Berlin' },
    { id: 'moscow', label: 'Moscow', tz: 'Europe/Moscow' },
    { id: 'dubai', label: 'Dubai', tz: 'Asia/Dubai' },
    { id: 'singapore', label: 'Singapore', tz: 'Asia/Singapore' },
    { id: 'tokyo', label: 'Tokyo', tz: 'Asia/Tokyo' },
    { id: 'sydney', label: 'Sydney', tz: 'Australia/Sydney' },
    { id: 'auckland', label: 'Auckland', tz: 'Pacific/Auckland' },
    
    // Indian Cities
    { id: 'mumbai', label: 'Mumbai', tz: 'Asia/Kolkata' },
    { id: 'delhi', label: 'Delhi', tz: 'Asia/Kolkata' },
    { id: 'bangalore', label: 'Bangalore', tz: 'Asia/Kolkata' },
    { id: 'hyderabad', label: 'Hyderabad', tz: 'Asia/Kolkata' },
    { id: 'chennai', label: 'Chennai', tz: 'Asia/Kolkata' },
    { id: 'kolkata', label: 'Kolkata', tz: 'Asia/Kolkata' },
    { id: 'pune', label: 'Pune', tz: 'Asia/Kolkata' },
    { id: 'ahmedabad', label: 'Ahmedabad', tz: 'Asia/Kolkata' },
    { id: 'jaipur', label: 'Jaipur', tz: 'Asia/Kolkata' },
    { id: 'surat', label: 'Surat', tz: 'Asia/Kolkata' },
    { id: 'lucknow', label: 'Lucknow', tz: 'Asia/Kolkata' },
    { id: 'kanpur', label: 'Kanpur', tz: 'Asia/Kolkata' },
    { id: 'nagpur', label: 'Nagpur', tz: 'Asia/Kolkata' },
    { id: 'indore', label: 'Indore', tz: 'Asia/Kolkata' },
    { id: 'thane', label: 'Thane', tz: 'Asia/Kolkata' },
    { id: 'bhopal', label: 'Bhopal', tz: 'Asia/Kolkata' },
    { id: 'visakhapatnam', label: 'Visakhapatnam', tz: 'Asia/Kolkata' },
    { id: 'pimpri_chinchwad', label: 'Pimpri-Chinchwad', tz: 'Asia/Kolkata' },
    { id: 'patna', label: 'Patna', tz: 'Asia/Kolkata' },
    { id: 'vadodara', label: 'Vadodara', tz: 'Asia/Kolkata' },
    { id: 'ghaziabad', label: 'Ghaziabad', tz: 'Asia/Kolkata' },
    { id: 'ludhiana', label: 'Ludhiana', tz: 'Asia/Kolkata' },
    { id: 'agra', label: 'Agra', tz: 'Asia/Kolkata' },
    { id: 'nashik', label: 'Nashik', tz: 'Asia/Kolkata' },
    { id: 'faridabad', label: 'Faridabad', tz: 'Asia/Kolkata' },
    { id: 'meerut', label: 'Meerut', tz: 'Asia/Kolkata' },
    { id: 'rajkot', label: 'Rajkot', tz: 'Asia/Kolkata' },
    { id: 'kalyan_dombivli', label: 'Kalyan-Dombivli', tz: 'Asia/Kolkata' },
    { id: 'vasai_virar', label: 'Vasai-Virar', tz: 'Asia/Kolkata' },
    { id: 'varanasi', label: 'Varanasi', tz: 'Asia/Kolkata' },
    { id: 'srinagar', label: 'Srinagar', tz: 'Asia/Kolkata' },
    { id: 'aurangabad', label: 'Aurangabad', tz: 'Asia/Kolkata' },
    { id: 'dhanbad', label: 'Dhanbad', tz: 'Asia/Kolkata' },
    { id: 'amritsar', label: 'Amritsar', tz: 'Asia/Kolkata' },
    { id: 'navi_mumbai', label: 'Navi Mumbai', tz: 'Asia/Kolkata' },
    { id: 'allahabad', label: 'Allahabad (Prayagraj)', tz: 'Asia/Kolkata' },
    { id: 'howrah', label: 'Howrah', tz: 'Asia/Kolkata' },
    { id: 'ranchi', label: 'Ranchi', tz: 'Asia/Kolkata' },
    { id: 'gwalior', label: 'Gwalior', tz: 'Asia/Kolkata' },
    { id: 'jabalpur', label: 'Jabalpur', tz: 'Asia/Kolkata' },
    { id: 'coimbatore', label: 'Coimbatore', tz: 'Asia/Kolkata' },
    { id: 'vijayawada', label: 'Vijayawada', tz: 'Asia/Kolkata' },
    { id: 'jodhpur', label: 'Jodhpur', tz: 'Asia/Kolkata' },
    { id: 'madurai', label: 'Madurai', tz: 'Asia/Kolkata' },
    { id: 'raipur', label: 'Raipur', tz: 'Asia/Kolkata' },
    { id: 'kota', label: 'Kota', tz: 'Asia/Kolkata' },
    { id: 'chandigarh', label: 'Chandigarh', tz: 'Asia/Kolkata' },
    { id: 'guwahati', label: 'Guwahati', tz: 'Asia/Kolkata' },
    { id: 'solapur', label: 'Solapur', tz: 'Asia/Kolkata' },
    { id: 'hubli_dharwad', label: 'Hubli-Dharwad', tz: 'Asia/Kolkata' },
    { id: 'tiruchirappalli', label: 'Tiruchirappalli', tz: 'Asia/Kolkata' },
    { id: 'bareilly', label: 'Bareilly', tz: 'Asia/Kolkata' },
    { id: 'mysore', label: 'Mysore', tz: 'Asia/Kolkata' },
    { id: 'salem', label: 'Salem', tz: 'Asia/Kolkata' },
    
    // Additional US Cities
    { id: 'anchorage', label: 'Anchorage', tz: 'America/Anchorage' },
    { id: 'honolulu', label: 'Honolulu', tz: 'Pacific/Honolulu' },
    
    // Additional International
    { id: 'toronto', label: 'Toronto', tz: 'America/Toronto' },
    { id: 'vancouver', label: 'Vancouver', tz: 'America/Vancouver' },
    { id: 'mexico_city', label: 'Mexico City', tz: 'America/Mexico_City' },
    { id: 'sao_paulo', label: 'São Paulo', tz: 'America/Sao_Paulo' },
    { id: 'buenos_aires', label: 'Buenos Aires', tz: 'America/Argentina/Buenos_Aires' },
    { id: 'cairo', label: 'Cairo', tz: 'Africa/Cairo' },
    { id: 'johannesburg', label: 'Johannesburg', tz: 'Africa/Johannesburg' },
    { id: 'bangkok', label: 'Bangkok', tz: 'Asia/Bangkok' },
    { id: 'hong_kong', label: 'Hong Kong', tz: 'Asia/Hong_Kong' },
    { id: 'seoul', label: 'Seoul', tz: 'Asia/Seoul' },
    { id: 'melbourne', label: 'Melbourne', tz: 'Australia/Melbourne' }
  ]

export function useWorldClocks() {
  const clocks = useLocalStorage<ClockEntry[]>(
    'world-clock:clocks',
    defaultClocks,
  ) as Ref<ClockEntry[]>

  const formattedNow = (tz: string): string => {
    return dayjs(now.value).tz(tz).format('ddd, MMM D YYYY • HH:mm:ss')
  }

  const addClock = (tz: string, label?: string): string | null => {
    const trimmedTz = tz.trim()
    const trimmedLabel = label?.trim()
    
    if (!trimmedTz) {
      return 'Timezone is required'
    }

    if (clocks.value.some(clock => clock.tz === trimmedTz)) {
      return 'This timezone is already added'
    }

    try {
      new Intl.DateTimeFormat('en-US', { timeZone: trimmedTz }).format()
    } catch {
      return 'Invalid timezone format. Please use IANA timezone (e.g., "Europe/London", "America/New_York")'
    }

    const id = `${trimmedTz}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    const finalLabel = trimmedLabel || trimmedTz.split('/').pop() || trimmedTz
    
    clocks.value = [...clocks.value, { 
      id, 
      label: finalLabel, 
      tz: trimmedTz 
    }]
    
    return null
  }

  const removeClock = (id: string): void => {
    clocks.value = clocks.value.filter(c => c.id !== id)
  }

  const resetDefaults = (): void => {
    clocks.value = [...defaultClocks]
  }

  return {
    clocks,
    formattedNow,
    addClock,
    removeClock,
    resetDefaults,
    popularTimezones,
  }
}

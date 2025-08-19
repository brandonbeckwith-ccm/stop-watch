import { ref } from "vue"
import { useStorage } from '@vueuse/core'

export type Clock = {
    id: number,
    city: string
}

export const useWorldClock = () => {
    const list = useStorage<Clock[]>('world-clocks', [
        { id: 224, city: "Mumbai" },
        { id: 154, city: "New York" }
    ])
    const now = ref<Date>(new Date());
    const timeZones = ref<string[]>([]);
    const cities = ref<Clock[]>([]);
    const isCityListVisible = ref<boolean>(false);

    setInterval(() => (now.value = new Date()), 1000);

    timeZones.value = Intl.supportedValuesOf("timeZone")

    cities.value = timeZones.value.map((timeZone, index) => ({
        id: index,
        city: timeZone.split("/")[1].replace("_", " "),
    })
    ).sort((a, b) => a.city.localeCompare(b.city)
    );

    const addItem = (item: Clock): void => {
        if (!list.value.includes(item)) {
            list.value.push(item)
        }
    }

    const removeItem = (id: number): void => {
        list.value = list.value.filter(item => item.id !== id)
    }

    const toggleVisibility = (): void => {
        isCityListVisible.value = !isCityListVisible.value
    }

    return {
        list,
        now,
        timeZones,
        isCityListVisible,
        cities,
        toggleVisibility,
        addItem,
        removeItem
    }
}
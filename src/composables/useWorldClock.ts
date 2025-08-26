import { ref, computed } from "vue"
import { useStorage } from '@vueuse/core'
import dayjs from "dayjs"

export type Clock = {
    id: number,
    city: string
}

export type CityGroup = {
    char: string, 
    citySort: Clock[]
}

export const useWorldClock = () => {
    const list = useStorage<Clock[]>('world-clocks', [
        { id: 224, city: "Mumbai" },
        { id: 154, city: "New York" }
    ])
    const now = ref<Date>(new Date());
    const timeZones = ref<string[]>([]);
    const cities = ref<Clock[]>([]);
    const cityGroup = ref<CityGroup[]>([]);
    const alpha = Array.from(Array(26)).map((_, i) => i + 65).map((char) => String.fromCharCode(char));

    const isAdded = computed(() => list.value.map(clock => clock.id))

    setInterval(() => (now.value = new Date()), 1000);

    const timeLabel = (id: number): string => {
        return dayjs(now.value).tz(timeZones.value[id]).format("hh:mm A")
    }

    const dateLabel = (id: number): string => {
        return dayjs(now.value).tz(timeZones.value[id]).format("ddd DD MMM YYYY")
    }

    timeZones.value = Intl.supportedValuesOf("timeZone")

    cities.value = timeZones.value.map((timeZone, index) => ({
        id: index,
        city: timeZone.split("/").pop()!.replace("_", " "),
    })
    ).sort((a, b) => a.city.localeCompare(b.city)
    );

    cityGroup.value = alpha.map((char) => {
        return {
            char: char,
            citySort: cities.value.filter((item) => item.city.startsWith(char)),
        };
    });

    const addItem = (item: Clock): void => {
        const isExist = list.value.some(clock => clock.id === item.id)
        if (!isExist) {
            list.value.push(item)
        }
    }

    const removeItem = (id: number): void => {
        list.value = list.value.filter(item => item.id !== id)
    }

    return {
        list,
        now,
        timeZones,
        cities,
        cityGroup,
        isAdded,
        timeLabel,
        dateLabel,
        addItem,
        removeItem
    }
}
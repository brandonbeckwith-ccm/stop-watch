import { computed } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export type NavbarStatus = {
    currentPage: ComputedRef<string>
    stopwatch: Ref<string>,
    result: Ref<string | number>
    statusClock : string
}

export const useNavbar = () => {
    const router = useRouter();
    const route = useRoute()
    const currentPage = computed(() => route.name)

    const goHome = (): void => {
        router.push("/");
    }

    const goClocks = (): void => {
        router.push("/clocks");
    }

    const goStopwatch = (): void => {
        router.push("/stopwatch");
    }

    const goCalculator = (): void => {
        router.push("/calculator");
    }

    return {
        goHome,
        goClocks,
        goStopwatch,
        goCalculator,
        currentPage
    }
}



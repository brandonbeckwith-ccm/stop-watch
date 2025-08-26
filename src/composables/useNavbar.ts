import { useRouter } from "vue-router";

export const useNavbar = () => {
    const router = useRouter();

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
        goCalculator
    }
}



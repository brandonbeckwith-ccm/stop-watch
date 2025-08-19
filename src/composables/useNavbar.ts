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

    return {
        goHome,
        goClocks,
        goStopwatch
    }
}



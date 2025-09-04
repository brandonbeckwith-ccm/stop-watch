import { ref, provide, inject } from "vue";

const navTitle = ref<string>("");
const navIcon = ref<string>("");
const navStatus = ref<string>("");

type NavType = {
  title: typeof navTitle;
  icon: typeof navIcon;
  status: typeof navStatus;
};

const KEY = Symbol("navigation");

export function provideNavigation() {
  provide<NavType>(KEY, {
    title: navTitle,
    icon: navIcon,
    status: navStatus,
  });
}

export function useNavigation() {
  const ctx = inject<NavType>(KEY);
  if (!ctx) throw new Error("Navigation not provided. Call provideNavigation() near the app root.");
  return ctx;
}

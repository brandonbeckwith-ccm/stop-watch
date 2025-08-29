import { ref, provide, inject } from "vue";

const NAV_KEY = Symbol("navigation");

export const createNavigation = () => {
  const title = ref("");
  const icon = ref("");
  const status = ref("");

  const setTitle = (t: string) => (title.value = t);
  const setIcon = (i: string) => (icon.value = i);
  const setStatus = (s: string) => (status.value = s);

  provide(NAV_KEY, { title, icon, status, setTitle, setIcon, setStatus });
};

export const useNavigation = () => {
  const nav = inject<{
    title: string;
    icon: any;
    status: string;
    setTitle: (t: string) => void;
    setIcon: (i: string) => void;
    setStatus: (s: string) => void;
  }>(NAV_KEY);

  if (!nav) throw new Error("Navigation not provided!");
  return nav;
};

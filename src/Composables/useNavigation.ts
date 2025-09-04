import { ref, provide, inject, type Ref } from "vue";

export const navigationKey = Symbol("navigation");

type NavigationState = {
  title: Ref<string>;
  icon: Ref<string>;
  status: Ref<string>;
  setTitle: (t: string) => void;
  setIcon: (i: string) => void;
  setStatus: (s: string) => void;
};

const createNavigation = (): NavigationState => {
  const title = ref<string>("");
  const icon = ref<string>("");
  const status = ref<string>("");

  const setTitle = (newTitle: string) => {
    title.value = newTitle;
  };
  const setIcon = (newIcon: string) => {
    icon.value = newIcon;
  };
  const setStatus = (newStatus: string) => {
    status.value = newStatus;
  };

  return { title, icon, status, setTitle, setIcon, setStatus };
};

export const provideNavigation = () => {
  const nav = createNavigation();
  provide(navigationKey, nav);
  return nav;
};

export const useNavigation = (): NavigationState => {
  const nav = inject<NavigationState | undefined>(navigationKey);
  if (!nav) {
    throw new Error("useNavigation must be used after provideNavigation()");
  }
  return nav;
};

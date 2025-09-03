import { inject, provide, ref } from "vue";

const NAVIGATION_KEY = Symbol("navigation");

export const createNavigation = () => {
  const title = ref("Default Page");
  const icon = ref("fal fa-home");
  const status = ref("");

  const setNavigation = (
    newTitle: string,
    newIcon: string,
    newStatus: string
  ) => {
    title.value = newTitle;
    icon.value = newIcon;
    status.value = newStatus;
  };

  return {
    title,
    icon,
    status,
    setNavigation,
  };
};

export const provideNavigation = () => {
  const navigation = createNavigation();
  provide(NAVIGATION_KEY, navigation);
  return navigation;
};

export const useNavigation = () => {
  const navigation =
    inject<ReturnType<typeof createNavigation>>(NAVIGATION_KEY);
  if (!navigation) {
    throw new Error("Navigation not provided.");
  }

  return navigation;
};
